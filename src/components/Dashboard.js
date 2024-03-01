import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Import isToday function
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  List,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  // console.log('In dashboard', userData);
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

  // Calculate progress values for proteinGoal, calorieGoal, and activityGoal
  const calculateProgress = () => {
    let proteinProgress = 0;
    let calorieProgress = 0;
    let activityProgress = 0;

    // Calculate proteinGoal and calorieGoal from macros
    if (macros.length > 0) {
      const today = new Date();
      const formattedToday = format(today, 'yyyy-MM-dd');

      // Filter macros for today's date
      const todaysMacros = macros.filter(macro => {
        const consumedDate = new Date(macro.consumed_at);
        return format(consumedDate, 'yyyy-MM-dd') === formattedToday;
      });

      // Sum up protein and calories for today's macros
      const totalProteinToday = todaysMacros.reduce((total, macro) => {
        return total + macro.protein;
      }, 0);

      const totalCaloriesToday = todaysMacros.reduce((total, macro) => {
        return total + macro.calories;
      }, 0);

      // Calculate proteinProgress and calorieProgress based on totals and goals
      proteinProgress = Math.min((totalProteinToday / userData.proteinGoal) * 100, 100);
      calorieProgress = Math.min((totalCaloriesToday / userData.calorieGoal) * 100, 100);



      // console.log('Total Protein Today:', totalProteinToday);
      // console.log('Total Calories Today:', totalCaloriesToday);
    }


    // Calculate activityGoal from workouts
    if (workouts.length > 0) {
      const today = new Date();
      const formattedToday = format(today, 'yyyy-MM-dd');

      const todaysWorkout = workouts.filter(workout => {
        // console.log('workout date', workout.date === formattedToday);
        return workout.date === formattedToday;
      });

      if (todaysWorkout) {
        // Sum up caloriesBurned for today's workouts
        const totalCaloriesBurnedToday = todaysWorkout.reduce((total, workout) => {
          return total + workout.caloriesBurned;
        }, 0);
        
        activityProgress = Math.min((totalCaloriesBurnedToday / userData.activityGoal) * 100, 100);
        // console.log('todays cal',totalCaloriesBurnedToday );
      }
    }

    return { proteinProgress, calorieProgress, activityProgress };
  };

  const { proteinProgress, calorieProgress, activityProgress } = calculateProgress();

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
                            Date: {workout.date}
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
        {loading ? (
          // Show loading button while fetching data
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box mt={4} textAlign="center">
                <Typography variant="h5" gutterBottom>
                  Protein Goal Progress
                </Typography>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={proteinProgress}
                    size={120}
                    thickness={5}
                    sx={{
                      color: proteinProgress >= 100 ? 'green' : 'red',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                  <Box
                    top={55}
                    left={55}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>{`${proteinProgress.toFixed(2)}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box mt={4} textAlign="center">
                <Typography variant="h5" gutterBottom>
                  Calorie Goal Progress
                </Typography>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={calorieProgress}
                    size={120}
                    thickness={5}
                    sx={{
                      color: calorieProgress >= 100 ? 'green' : 'red',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                  <Box
                    top={55}
                    left={55}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>{`${calorieProgress.toFixed(2)}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box mt={4} textAlign="center">
                <Typography variant="h5" gutterBottom>
                  Activity Goal Progress
                </Typography>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={activityProgress}
                    size={120}
                    thickness={5}
                    sx={{
                      color: activityProgress >= 100 ? 'green' : 'red',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                  <Box
                    top={55}
                    left={55}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>{`${activityProgress.toFixed(2)}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;

