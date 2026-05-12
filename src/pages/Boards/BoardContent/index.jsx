import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'

function BoardContent() {
  const { mode, systemMode } = useColorScheme()
  const currentMode = (mode === 'system' ? systemMode : mode) || 'light'

  return (
    <div>
      <Box
        sx={{
          bgcolor: currentMode === 'dark' ? '#2b3a55' : '#75c3fe',
          width: '100%',
          height: (theme) =>
            `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        BoardContent
      </Box>
    </div>
  )
}

export default BoardContent