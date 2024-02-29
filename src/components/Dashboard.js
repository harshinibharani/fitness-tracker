import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  console.log('In dashboard', userData);
  const navigate = useNavigate(); // Hook for navigation
  const [workouts, setWorkouts] = useState([]);
  const [macros, setMacros] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch user's workouts and macros on component mount
    const fetchDashboardData = async () => {
      try {
        const workoutResponse = await fetch(`http://localhost:4000/workouts/${userData._id}`);
        const workoutData = await workoutResponse.json();
        setWorkouts(workoutData.workouts);

        const macrosResponse = await fetch(`http://localhost:4000/macros/${userData._id}`);
        const macrosData = await macrosResponse.json();
        setMacros(macrosData.macros);

        // Both data fetched, set loading to false
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchDashboardData();
  }, [userData._id]);

  const handleLogOut = () => {
    // Implement logout logic here, such as clearing local storage or session
    // Then navigate back to login
    navigate('/');
  };

  const handleLogWorkout = () => {
    navigate('/logworkout', { state: { userData } }); // Pass userData to LogWorkout
  };

  const handleMacros = () => {
    navigate('/macros', { state: { userData } }); // Pass userData to Macros
  };

  const handleProfile = () => {
    navigate('/profile', { state: { userData } }); // Pass userData to Profile
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
            onClick={handleProfile} // Call handleProfile to navigate
            sx={{ textDecoration: 'none' }}
          >
            Profile
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
            onClick={handleMacros}
            sx={{ textDecoration: 'none' }}
          >
            Macros
          </Button>
          <Button
            color="inherit"
            onClick={handleLogOut} // Call handleLogOut for logout
            sx={{ textDecoration: 'none' }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Welcome, {userData?.name}!
          </Typography>
        </Box>
        {loading ? (
          // Show loading button while fetching data
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                  Your Logged Workouts
                </Typography>
                {workouts.length === 0 ? (
                  <Typography variant="body1">No workouts logged yet.</Typography>
                ) : (
                  <List>
                    {workouts.map((workout, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="subtitle1" component="div">
                            {workout.activityType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Calories Burned: {workout.caloriesBurned}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {format(new Date(workout.date), 'MM/dd/yyyy')}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </List>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                  Your Logged Macros
                </Typography>
                {macros.length === 0 ? (
                  <Typography variant="body1">No macros logged yet.</Typography>
                ) : (
                  <List>
                    {macros.map((macro, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="subtitle1" component="div">
                            {macro.foodName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Calories: {macro.calories}, Protein: {macro.protein}, Carbs: {macro.carbohydrates}, Fat: {macro.fat}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Consumed At: {format(new Date(macro.consumed_at), 'MM/dd/yyyy hh:mm:ss a')}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </List>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
