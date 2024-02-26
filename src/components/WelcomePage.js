import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Grid,
  CssBaseline,
  Avatar,
} from '@mui/material';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');
  const [userData, setUserData] = useState(null); // State to store user data

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const handleLogin = async () => {
    if (inputName.trim() !== '') {
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: inputName }),
        });

        const data = await response.json();
        if (response.ok && data.user) {
          console.log(data.user);
          setName(inputName);
          setUserData(data.user); // Set user data
          setLoggedIn(true);
          navigate('/dashboard', { state: { userData: data.user} }); // Navigate to dashboard with userData
        } else {
          alert('User not found');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check the console for more details.');
      }
    } else {
      alert('Please enter your name to log in.');
    }
  };

  const handleLogout = () => {
    setName('');
    setInputName('');
    setLoggedIn(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
          {loggedIn ? `Welcome back, ${name}!` : 'Fitness Tracker'}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {!loggedIn && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={inputName}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/register" variant="body2">
                    New User? Register
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
          {loggedIn && (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default WelcomePage;
