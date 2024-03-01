import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function WelcomePage() {
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
            // console.log(data.user);
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
      handleLogin();
    };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?fitness)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <FitnessCenterOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Fitness Tracker
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    New User? Register
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default WelcomePage;

