import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'

const Profiles = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt ="Image avatar"
            src="https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/476116024_1339504910572530_7380376174144499750_n.jpg?stp=cp6_dst-jpg_p180x540_tt6&_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=BOZ603hYPMEQ7kNvwF7lc_3&_nc_oc=AdqJ1tFJqucjBdv9H-KWDQseFm3e3jQrCkP4SlHorSQAxDW2Uywi63dS_T5a8Z7-MOE&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=SKE0yBsKlUEP8m-Y2FTU3w&_nc_ss=7b2a8&oh=00_Af4iA7tfaxin9kSwIPbO1rSrWZ_bHdiT65GEkW_RJMruWw&oe=6A04678F" />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        aria-labelledby="basic-button-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem >
          <Avatar sx={{ width: 24, height: 24, mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem >
          <Avatar sx={{ width: 24, height: 24, mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles