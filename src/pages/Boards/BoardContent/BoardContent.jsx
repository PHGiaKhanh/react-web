import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const { mode, systemMode } = useColorScheme()
  const currentMode = (mode === 'system' ? systemMode : mode) || 'light'
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <div>
      <Box
        sx={{
          //bgcolor: currentMode === 'dark' ? '#2b3a55' : '#75c3fe',
          bgcolor: currentMode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </div>
  )
}

export default BoardContent