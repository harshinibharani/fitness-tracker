import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar
} from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const LogWorkout = () => {
  const [activityType, setActivityType] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [date, setDate] = useState('');

  const location = useLocation();
  const userData = location.state?.userData;
  // console.log('In logworkout',userData);

  const handleActivityTypeChange = (event) => {
    setActivityType(event.target.value);
  };

  const handleCaloriesBurnedChange = (event) => {
    setCaloriesBurned(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log(userData?._id,'ID');
      const response = await fetch('http://localhost:4000/workouts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData._id, // User ID from props
          activityType,
          caloriesBurned: parseInt(caloriesBurned),
          date,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert('Failed to log workout');
      }
    } catch (error) {
      console.error('Error logging workout:', error);
      alert('Failed to log workout. Please check the console for more details.');
    }
  };

  return (
    <div>
      
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <EditNoteOutlinedIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Log Workout
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center">
          <form onSubmit={handleSubmit}>
           <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="activity-type-label">Activity Type</InputLabel>
             <Select
              labelId="activity-type-label"
              id="activity-type"
              value={activityType}
              onChange={handleActivityTypeChange}
              fullWidth
              required
            >
              <MenuItem value="Boxing">Boxing</MenuItem>
              <MenuItem value="Climbing">Climbing</MenuItem>
              <MenuItem value="Core Training">Core Training</MenuItem>
              <MenuItem value="Cross Training">Cross Training</MenuItem>
              <MenuItem value="Cycling">Cycling</MenuItem>
              <MenuItem value="Dance">Dance</MenuItem>
              <MenuItem value="Elliptical">Elliptical</MenuItem>
              <MenuItem value="Strength Training">Strength Training</MenuItem>
              <MenuItem value="HIIT">HIIT</MenuItem>
              <MenuItem value="Hiking">Hiking</MenuItem>
              <MenuItem value="Running">Running</MenuItem>
              <MenuItem value="Walking">Walking</MenuItem>
              <MenuItem value="Jump Rope">Jump Rope</MenuItem>
              <MenuItem value="Kickboxing">Kickboxing</MenuItem>
              <MenuItem value="Pilates">Pilates</MenuItem>
            </Select>
          </FormControl>
            <TextField
              margin="normal"
              fullWidth
              id="calories-burned"
              label="Calories Burned"
              type="number"
              value={caloriesBurned}
              onChange={handleCaloriesBurnedChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Log Workout
            </Button>
          </form>
          </Grid>
        </Box>
    </div>
  );
};

export default LogWorkout;