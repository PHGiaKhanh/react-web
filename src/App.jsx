import { Button } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'

import { useColorScheme } from '@mui/material/styles'

//import useMediaQuery from '@mui/material/useMediaQuery'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import LightModIcon from '@mui/icons-material/LightMode'
import DarkModeOutlineIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value="light">
            <Box sx={{ display: 'flex', alignItems: 'center', gap : 1 }}>
              <LightModIcon fontSize="small" /> Light
            </Box>
          </MenuItem>

          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center', gap : 1 }}>
              <DarkModeOutlineIcon fontSize="small" /> Dark
            </Box>
          </MenuItem>

          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center', gap : 1 }}>
              <SettingsBrightnessIcon fontSize="small" /> System
            </Box>
          </MenuItem>

        </Select>
      </FormControl>
    </Box>
  )
}

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  // console.log('prefersDarkMode:', prefersDarkMode)
  // console.log('prefersLightMode:', prefersLightMode)
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
  return (
    <>
      <ModeSelect />
      <hr/>
      <ModeToggle />
      <hr/>
      <p>Khansh hojc code</p>
      <Typography variant="body2" color="text.secondary">
        MUI Typography
      </Typography>

      <Button variant="text">Text</Button>
      <Button variant="contained" color={'success'}>
        Contained
      </Button>
      <Button variant="outlined">Outlined</Button>
      <AccessAlarmIcon />
      <ThreeDRotation />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon color="error" />
      <HomeIcon color="inherit" />
      <HomeIcon sx={{ color: pink[200] }} />
    </>
  )
}

export default App