import Box from '@mui/material/Box'

function Boards() {
  return (
    <Box sx={{
      bgcolor: (theme) => {return theme.palette.mode === 'dark' ? '#bc2bff' : '#4dda7e'},
      width:'100%',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      display:'flex',
      alignItems:'center'
    }}
    >
      BoardContent
    </Box>
  )
}
export default Boards