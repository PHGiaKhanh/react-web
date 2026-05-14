import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'

function Boards() {
  const { mode, systemMode } = useColorScheme()
  const currentMode = (mode === 'system' ? systemMode : mode) || 'light'

  return (
    <Box sx={{
      bgcolor: currentMode === 'dark' ? '#bc2bff' : '#4dda7e',
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