import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
// import trellologo from '~/assets/trello.svg'
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

function AppBar() {
  return (
    <>
      {/* px is padding left and right */}
      <Box px={2} sx={{
        width:'100%',
        height: (theme) => theme.trello.appBarHeight,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap: 2,
        overflow: 'auto'
      }}>

        <Box sx={{ display:'flex', alignItems:'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display:'flex', alignItems:'center', gap: 0.5 }}>
            {/* <img src={trellologo} alt="Trello Logo" style={{ height: '24px', marginLeft: '8px' }} /> */}
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small" sx={{ color: 'primary.main' }} />
            <Typography variant="span" sx={{ color: 'primary.main', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Trello
            </Typography>
          </Box>

          <Box sx={{display:{ xs:'none', md:'flex' }, gap: 1}}>
            <Workspaces/>
            <Recent/>
            <Starred/>
            <Templates/>
            <Button variant="outlined">Create</Button>
          </Box>
        </Box>

        <Box sx={{ display:'flex', alignItems:'center', gap: 2 }}>
          <TextField id="outlined-search" label="Search..." type="search" size="small" fullWidth minWidth="120px" />
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{cursor: 'pointer'}}>
              <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Help">
            <HelpOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar