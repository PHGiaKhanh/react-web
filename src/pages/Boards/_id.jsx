import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '../../components/AppBar'

function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main' }}>
        <AppBar />
        <Box sx={{
          backgroundColor:'primary.dark',
          width:'100%',
          height: (theme) => theme.trello.boardBarHeight,
          display:'flex',
          alignItems:'center'
        }}>
          Board Bar
        </Box>
        <Box sx={{
          backgroundColor:'primary.main',
          width:'100%',
          height: (theme) => `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
          display:'flex',
          alignItems:'center'
        }}>
          Board Content
        </Box>
      </Container>
    </>
  )
}

export default Board