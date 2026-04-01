import { Button } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import HomeIcon from '@mui/icons-material/Home';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
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
  );
}

export default App;
