import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link as RouterLink, useNavigate} from 'react-router-dom';

const NavBar = ({ userData }) => {
    const navigate = useNavigate();
  
    const handleDashboardClick = () => {
      navigate('/dashboard', { state: { userData } });
    };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <DashboardOutlinedIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fitness Tracker Dashboard
        </Typography>
        <Button
          color="inherit"
          component={RouterLink}
          onClick={handleDashboardClick}
          to="/dashboard"
          sx={{ textDecoration: 'none' }}
        >
          Dashboard
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/logworkout"
          sx={{ textDecoration: 'none' }}
        >
          Log Workout
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/exercise"
          sx={{ textDecoration: 'none' }}
        >
          Explore Exercises
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: 'none' }}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
