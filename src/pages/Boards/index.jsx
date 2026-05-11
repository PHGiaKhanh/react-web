import Box from '@mui/material/Box'

function Boards() {
  return (
    <Box sx={{
      bgcolor: (theme) => {return theme.palette.mode === 'dark' ? '#30336b' : '#0077ff'},
      width:'100%',
      height: (theme)=> `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      display:'flex',
      alignItems:'center'
    }}
    >
      BoardContent
    </Box>
  )
}
export default Boards