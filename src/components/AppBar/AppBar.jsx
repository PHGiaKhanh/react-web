import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Templates from './Menus/Templates'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useColorScheme } from '@mui/material/styles'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  const { mode, systemMode } = useColorScheme()

  // mode có thể là: 'light' | 'dark' | 'system'
  const currentMode = (mode === 'system' ? systemMode : mode) || 'light'

  return (
    <>
      <Box
        px={2}
        sx={{
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
          bgcolor: currentMode === 'dark' ? '#072246' : '#093675'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {/* <img src={trellologo} alt="Trello Logo" style={{ height: '24px', marginLeft: '8px' }} /> */}
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color: 'white' }} />
            <Typography component="span" sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Trello
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              variant="outlined"
              startIcon={<LibraryAddIcon />}
              sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}>
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search..."
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <CloseIcon
                    fontSize="small"
                    sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                    onClick={() => setSearchValue('')}
                  />
                )
              }
            }}
            sx={{
              ' & label': { color: 'white' },
              ' & input': { color: 'white' },
              ' & label.Mui-focused': {
                color: 'white'
              },
              ' & .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              },
              minWidth: '180px'
            }}
            fullWidth />
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Help">
            <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'white' }} />
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar