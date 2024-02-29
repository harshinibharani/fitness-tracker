import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, 
    TextField, 
    Button, 
    Container, 
    Paper,
    Avatar,
    CssBaseline,
} from '@mui/material';
import { getNutritionData } from './API.js'; // Importing the API function
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';

const Macros = () => {
    const [foodName, setFoodName] = useState('');
    const [nutritionData, setNutritionData] = useState(null);

    const location = useLocation();
    const userData = location.state?.userData;
    console.log('In Macros', userData);

    const handleSave = async (e) => {
        e.preventDefault();
        console.log('nd inside save', nutritionData);
        // insert to Macros Collection
        const response = await fetch('http://localhost:4000/macros/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userData._id, // User ID from props
                foodName: nutritionData.food_name,
                calories: nutritionData.nf_calories,
                protein: nutritionData.nf_protein,
                carbohydrates: nutritionData.nf_total_carbohydrate,
                fat: nutritionData.nf_total_fat,
                consumed_at: nutritionData.consumed_at
            }),
        });

        const insert = await response.json();
        if (response.ok) {
            alert(insert.message);
        } else {
            alert('Failed to log macros');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // get nutrition data for entered food
            const data = await getNutritionData(foodName);
            if (data) {
                setNutritionData(data.foods[0]);
            }
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper
            elevation={3}
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <RestaurantOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Food Nutrition Search
            </Typography>
            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="foodName"
                label="Food Name"
                variant="outlined"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g., apple, banana, pizza"
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
              >
                Search
              </Button>
            </form>
    
            {nutritionData && (
              <div style={{ width: '100%' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  Nutrition Information
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Name:</strong> {nutritionData.food_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Calories:</strong> {nutritionData.nf_calories}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Protein:</strong> {nutritionData.nf_protein}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Carbohydrates:</strong>{' '}
                  {nutritionData.nf_total_carbohydrate}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Fat:</strong> {nutritionData.nf_total_fat}
                </Typography>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '20px' }}
                >
                  Save
                </Button>
              </div>
            )}
          </Paper>
        </Container>
      );
};

export default Macros;

