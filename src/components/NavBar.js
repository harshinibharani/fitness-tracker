import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = ({ userData }) => {
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
          to="/trackmacros"
          sx={{ textDecoration: 'none' }}
        >
          Track Macros
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
