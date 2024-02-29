import axios from 'axios';

export async function getNutritionData(foodQuery) {
  try {
    const response = await axios.post(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      { query: foodQuery },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
          'x-app-key': process.env.REACT_APP_NUTRITIONIX_API_KEY,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    throw error; // Re-throwing the error to handle it in the component
  }
}
