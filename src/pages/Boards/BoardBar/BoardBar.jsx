import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useColorScheme } from '@mui/material/styles'
import {capitalizeFirstLetter} from '~/utils/formatters'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({board }) {


  const { mode, systemMode } = useColorScheme()
  const currentMode = (mode === 'system' ? systemMode : mode) || 'light'

  return (
    <div>
      <Box sx={{
        width:'100%',
        height: (theme) => theme.trello.boardBarHeight,
        display:'flex',
        alignItems:'center',
        paddingX: 2,
        justifyContent:'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: currentMode === 'dark' ? '#27354f' : '#0d4c98'
      }}>
        <Box sx={{ display:'flex', alignItems:'center', gap: 2 }}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
            // onClick={() => alert('Clicked!')}
          />

          <Chip
            sx={MENU_STYLE}
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            clickable
          />

          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add to GGDrive"
            clickable
          />

          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add to GGDrive"
            clickable
          />

          <Chip
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />

          <Chip
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />
        </Box>

        <Box sx={{ display:'flex', alignItems:'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{
              color:'white',
              borderColor: 'white',
              '&:hover': { borderColor:'white' }
            }}
          >
            Invite
          </Button>

          <AvatarGroup
            max={7}
            sx={{
              gap:'10px',
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                fontSize: 14,
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                '&:first-of-type': { bgcolor: '#a4b0be' }
              } }}
          >
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
            <Tooltip title="learn with camoi">
              <Avatar alt="learn with camoi" src="" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </div>
  )
}

export default BoardBar