require('dotenv').config(); // This will load your .env file
const express = require('express');

const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

// MongoDB connection string
// const { parse } = require('mongodb-connection-string-url');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo();

// Middleware
app.use(express.json());

// Login route
app.post('/login', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    const database = client.db('fitness-tracker');
    const usersCollection = database.collection('Users');

    const query = { name };
    const user = await usersCollection.findOne(query);

    if (user) {
      return res.json({ message: 'Login successful', user });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});
// Register route
app.post('/register', async (req, res) => {
  const { name, age, weight, height, calorieGoal, proteinGoal, activityGoal } = req.body;
  if (!name || !age || !weight || !height || !calorieGoal || !proteinGoal || !activityGoal) {
    return res.status(400).json({ message: 'All details are required' });
  }

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ message: 'Age, weight, and height must be numbers' });
  }

  try {
    const database = client.db('fitness-tracker');
    const usersCollection = database.collection('Users');

    const existingUser = await usersCollection.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { 
      name, 
      age: parseInt(age), 
      weight: parseInt(weight), 
      height: parseInt(height) ,
      calorieGoal: parseInt(calorieGoal),
      proteinGoal: parseInt(proteinGoal),
      activityGoal: parseInt(activityGoal)
    };
    const result = await usersCollection.insertOne(newUser);

    return res.json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// Add workout route
app.post('/workouts/add', async (req, res) => {
  const { userId, activityType, caloriesBurned, date} = req.body;
  if (!userId || !activityType || !caloriesBurned || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const database = client.db('fitness-tracker');
    const workoutsCollection = database.collection('Workouts');

    const newWorkout = {
      userId: new ObjectId(userId), // Convert userId to ObjectId
      activityType,
      caloriesBurned: parseInt(caloriesBurned),
      date,
    };

    const result = await workoutsCollection.insertOne(newWorkout);

    return res.json({ message: 'Workout added successfully', newWorkout });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

//add macros
app.post('/macros/add', async (req, res) => {
  const { userId, foodName, calories, protein, carbohydrates, fat, consumed_at } = req.body;
  if (!userId || !foodName || !calories || !protein || !carbohydrates || !fat || !consumed_at) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const database = client.db('fitness-tracker');
    const macrosCollection = database.collection('Macros');
    console.log(foodName);
    const newMacro = {
      userId: new ObjectId(userId), // Convert userId to ObjectId
      foodName,
      calories,
      protein,
      carbohydrates,
      fat,
      consumed_at
    };

    const result = await macrosCollection.insertOne(newMacro);

    return res.json({ message: 'Macro added successfully', newMacro });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Get workouts for a specific user
app.get('/workouts/:userId', async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const database = client.db('fitness-tracker');
    const workoutsCollection = database.collection('Workouts');

    // Find all workouts for the given userId
    const workouts = await workoutsCollection.find({ userId: new ObjectId(userId) }).toArray();

    return res.json({ workouts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Get macros for a specific user
app.get('/macros/:userId', async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const database = client.db('fitness-tracker');
    const macrosCollection = database.collection('Macros');

    // Find all macros for the given userId
    const macros = await macrosCollection.find({ userId: new ObjectId(userId) }).toArray();

    return res.json({ macros });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
