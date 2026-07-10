import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mapOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToAnotherColumnAPI,
  deleteColumnDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { Typography } from '@mui/material'

function App() {

  const [board, setBoard] = useState(null)
  useEffect(() => {
    //Tạm thời set cứng bpardId, flow chuẩn chỉnh là sẽ dùng react-router-dom để lấy boardId từ url
    const boardId = '6a39f63bd485524f5cef9a8d'
    fetchBoardDetailsAPI(boardId).then(board => {

      //Sắp xếp lại thứ tự các column ở đây trước khi đưa dữ liệu xuống các component con
      board.columns = mapOrder(board?.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        //Xử lý kéo thả vào col rỗng khi f5 trang web
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          //Sắp xếp thứ tự card ở đây trước khi đưa dữ liệu xuống bên dưới các component
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  //function goi API tạo column mới va update state board
  const createNewColumn = async(newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })


    // Xử lý khi kéo card vào một col mới tạo chưa có card
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    //Cập nhật lại state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async(newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    //cập nhật lại state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      //column roongx ddang chuaws 1 plaaceholder card, cần xóa placeholder card đi trước khi push card mới vào
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    console.log('createNewCard - columnToUpdate:', columnToUpdate)
    setBoard(newBoard)
  }

  //function goi API khi kéo thả xong col
  //Gọi api để cập nhật mảng columnOrderIds của Board chứa nó
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    //gọi API update column order
    updateBoardDetailsAPI(board._id, { columnOrderIds: dndOrderedColumnIds })
  }


  //Khi di chuyển card trong cùng 1 col
  //Chỉ cần gọi API để cập nhậtt cardOrderIds của column chứa nó(thay đổi vị trí trog mảng)
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    //update chuẩn dữ liệu state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    //gọi api update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }


  //Khi di chuyển card sang col khác
  //B1: Cập nhật mảng cardOrderIds của col chứa card cũ (sourceColumnId)
  //B2: Cập nhật mảng cardOrderIds của col chứa card mới (destinationColumnId)
  //B3: Cập nhật columnId mới của Card đã kéo-> vieets API riêng
  const moveCardToAnotherColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    console.log('currentCardId:', currentCardId)
    console.log('prevColumnId:', prevColumnId)
    console.log('nextColumnId:', nextColumnId)
    console.log('dndOrderedColumns:', dndOrderedColumns)

    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    //Gọi API xxử lý BE
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    //Xử lý vấn đề khi kéo card cuối cùng ra khỏi col, column rỗng sẽ có 1 card placeholder,cần xóa đi trước khi gửi dữ liệu lên BE
    if (!prevCardOrderIds[0].includes('-placeholder-card')) prevCardOrderIds = []

    moveCardToAnotherColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  //Xử lý xóa 1 col và card bên trong col đó
  const deleteColumnDetails = (columnId) => {
    //update state board

    //Gọi API xử lý phía
    deleteColumnDetailsAPI(columnId).then( res => {
      console.log('deleteColumnDetailsAPI res:', res)
    })
  }

  if (!board) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, height: '100vh', width: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" component="div">
          Loading board...
        </Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}

        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToAnotherColumn={moveCardToAnotherColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default App