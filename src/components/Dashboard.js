import React from 'react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate(); // Hook for navigation

  const handleLogWorkout = () => {
    navigate('/logworkout', { state: { userData } }); // Navigate with userData
  };

  return (
    <div>
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
            to="/profile"
            sx={{ textDecoration: 'none' }}
          >
            My Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleLogWorkout} // Call handleLogWorkout to navigate
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
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Welcome, {userData?.name}!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here is your dashboard with user data:
          </Typography>
          <Typography variant="body1">
            Name: {userData?.name}
          </Typography>
          <Typography variant="body1">
            Age: {userData?.age}
          </Typography>
          <Typography variant="body1">
            Weight: {userData?.weight} lbs
          </Typography>
          <Typography variant="body1">
            Height: {userData?.height} cm
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
