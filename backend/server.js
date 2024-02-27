const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

// MongoDB connection string
const uri = "mongodb+srv://hbharani:UnivMass22@cluster0.7ttzqaf.mongodb.net/fitness-tracker?retryWrites=true&w=majority&appName=Cluster0";
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
  const { name, age, weight, height } = req.body;
  if (!name || !age || !weight || !height) {
    return res.status(400).json({ message: 'Name, age, weight, and height are required' });
  }

  try {
    const database = client.db('fitness-tracker');
    const usersCollection = database.collection('Users');

    const existingUser = await usersCollection.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { name, age: parseInt(age), weight: parseInt(weight), height: parseInt(height) };
    const result = await usersCollection.insertOne(newUser);

    return res.json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Add workout route
app.post('/workouts/add', async (req, res) => {
  const { userId, activityType, caloriesBurned, date } = req.body;
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
      date: new Date(date),
    };

    const result = await workoutsCollection.insertOne(newWorkout);

    return res.json({ message: 'Workout added successfully', newWorkout });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
