import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField,Link, Grid, Box, Typography, Container } from '@mui/material';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [proteinGoal, setProteinGoal] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [activityGoal, setActivityGoal] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleCalorieChange = (event) => {
    setCalorieGoal(event.target.value);
  };

  const handleProteinChange = (event) => {
    setProteinGoal(event.target.value);
  };

  const handleActivityChange = (event) => {
    setActivityGoal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting:', { name, age, weight, height, calorieGoal, proteinGoal, activityGoal });
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, weight, height, calorieGoal, proteinGoal, activityGoal }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        console.log('Registration response:', data);

        navigate('/'); // Navigate to login page on successful registration
      } else {
        console.log('Registration response:', data);
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please check the console for more details.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FitnessCenterOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                  type="number"
                  value={age}
                  onChange={handleAgeChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="weight"
                  label="Weight (kg)"
                  name="weight"
                  autoComplete="weight"
                  type="number"
                  value={weight}
                  onChange={handleWeightChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="height"
                  label="Height (cm)"
                  name="height"
                  autoComplete="height"
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="caloriegoal"
                  label="per day calorie goal (cal)"
                  name="caloriegoal"
                  type="number"
                  value={calorieGoal}
                  onChange={handleCalorieChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="proteingoal"
                  label="per day protein goal (g)"
                  name="proteingoal"
                  type="number"
                  value={proteinGoal}
                  onChange={handleProteinChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="activitygoal"
                  label="per day activity goal (cal)"
                  name="activitygoal"
                  type="number"
                  value={activityGoal}
                  onChange={handleActivityChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {new Date().getFullYear()} Fitness Tracker
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegistrationPage;
