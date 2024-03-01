import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, AppBar, Toolbar, Paper, Grid } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Profile = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <PersonOutlinedIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              User Profile
            </Typography>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {userData?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Age:</strong> {userData?.age}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Weight:</strong> {userData?.weight} kgs
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Height:</strong> {userData?.height} cm
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Per day calorie goal:</strong> {userData?.calorieGoal} cal
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Per day protein goal:</strong> {userData?.proteinGoal} g
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Per day activity goal:</strong> {userData?.activityGoal} cal
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
