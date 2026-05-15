import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
      <AppBar />
      {/* board={mockData?.board} lỡ kh có data kh bị lỗi như 1 if else  */}
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default App

// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
// import AppBar from '../../components/AppBar'

// function Board() {
//   return (
//     <>
//       <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main' }}>
//         <AppBar />
//         <Box sx={{
//           backgroundColor:'primary.dark',
//           width:'100%',
//           height: (theme) => theme.trello.boardBarHeight,
//           display:'flex',
//           alignItems:'center'
//         }}>
//           Board Bar
//         </Box>
//         <Box sx={{
//           backgroundColor:'primary.main',
//           width:'100%',
//           height: (theme) => `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
//           display:'flex',
//           alignItems:'center'
//         }}>
//           Board Content
//         </Box>
//       </Container>
//     </>
//   )
// }

// export default Board