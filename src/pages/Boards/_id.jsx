import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
//import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function App() {

  const [board, setBoard] = useState(null)
  useEffect(() => {
    //Tạm thời set cứng bpardId, flow chuẩn chỉnh là sẽ dùng react-router-dom để lấy boardId từ url
    const boardId = '6a39f63bd485524f5cef9a8d'
    fetchBoardDetailsAPI(boardId).then(board => {
      //Xử lý kéo thả vào col rỗng khi f5 trang web
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
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
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }


  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  )
}

export default App