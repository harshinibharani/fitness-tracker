// import React, { useState, useEffect } from 'react';
// import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Container,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

// const Dashboard = () => {
//   const location = useLocation();
//   const userData = location.state?.userData;
//   const navigate = useNavigate(); // Hook for navigation
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     // Fetch user's workouts on component mount
//     const fetchWorkouts = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/workouts/${userData._id}`);
//         const data = await response.json();
//         setWorkouts(data.workouts);
//       } catch (error) {
//         console.error('Error fetching workouts:', error);
//       }
//     };

//     fetchWorkouts();
//   }, [userData._id]);

//   const handleLogOut = () => {
//     // Implement logout logic here, such as clearing local storage or session
//     // Then navigate back to login
//     navigate('/');
//   };
//     const handleLogWorkout = () => {
//     navigate('/logworkout', { state: { userData } }); // Navigate with userData
//   };

//   return (
//     <div>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <DashboardOutlinedIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Fitness Tracker Dashboard
//           </Typography>
//           <Button
//             color="inherit"
//             onClick={handleLogWorkout} // Call handleLogWorkout to navigate
//             sx={{ textDecoration: 'none' }}
//           >
//             Log Workout
//           </Button>
//           <Button
//             color="inherit"
//             component={RouterLink}
//             to="/trackmacros"
//             sx={{ textDecoration: 'none' }}
//           >
//             Track Macros
//           </Button>
//           <Button
//             color="inherit"
//             onClick={handleLogOut} // Call handleLogOut for logout
//             sx={{ textDecoration: 'none' }}
//           >
//             Log Out
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Container>
//         <Box mt={4}>
//           <Typography variant="h4" gutterBottom>
//             Welcome, {userData?.name}!
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Here is your dashboard with user data:
//           </Typography>
//           <Typography variant="body1">
//             Name: {userData?.name}
//           </Typography>
//           <Typography variant="body1">
//             Age: {userData?.age}
//           </Typography>
//           <Typography variant="body1">
//             Weight: {userData?.weight} lbs
//           </Typography>
//           <Typography variant="body1">
//             Height: {userData?.height} cm
//           </Typography>
//         </Box>

//         <Box mt={4}>
//           <Typography variant="h5" gutterBottom>
//             Your Logged Workouts
//           </Typography>
//           {workouts.length === 0 ? (
//             <Typography variant="body1">No workouts logged yet.</Typography>
//           ) : (
//             <List>
//               {workouts.map((workout, index) => (
//                 <ListItem key={index}>
//                   <ListItemText
//                     primary={`${workout.activityType} - Calories Burned: ${workout.caloriesBurned}`}
//                     secondary={`Date: ${new Date(workout.date).toLocaleDateString()}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           )}
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const navigate = useNavigate(); // Hook for navigation
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch user's workouts on component mount
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/workouts/${userData._id}`);
        const data = await response.json();
        setWorkouts(data.workouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [userData._id]);

  const handleLogOut = () => {
    // Implement logout logic here, such as clearing local storage or session
    // Then navigate back to login
    navigate('/');
  };

  const handleLogWorkout = () => {
    navigate('/logworkout', { state: { userData } }); // Pass userData to LogWorkout
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

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Your Logged Workouts
          </Typography>
          {workouts.length === 0 ? (
            <Typography variant="body1">No workouts logged yet.</Typography>
          ) : (
            <List>
              {workouts.map((workout, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${workout.activityType} - Calories Burned: ${workout.caloriesBurned}`}
                    secondary={`Date: ${new Date(workout.date).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
