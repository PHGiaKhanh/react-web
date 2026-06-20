import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'

function App() {

  const [board, setBoard] = useState(null)
  useEffect(() => {
    //Tạm thời set cứng bpardId, flow chuẩn chỉnh là sẽ dùng react-router-dom để lấy boardId từ url
    const boardId = '6a364c04b2ab48c87dfe4709'
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      {/* board={mockData?.board} lỡ kh có data kh bị lỗi như 1 if else  */}
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default App