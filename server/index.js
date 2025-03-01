import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectToDb() {
  try {
    await client.connect();
    db = client.db('shifa_clinic');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Generate registration number
function generateRegistrationNumber(role) {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${role === 'doctor' ? 'DR' : 'PT'}${year}${month}${random}`;
}

// Register user (doctor or patient)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone, role, diseaseDescription = null } = req.body;
    
    // Validate role
    if (!['doctor', 'patient'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const collection = db.collection('users');
    
    // Check if email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate unique registration number
    const registrationNumber = generateRegistrationNumber(role);

    // Create user object
    const user = {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      registrationNumber,
      registrationDate: new Date(),
      ...(role === 'patient' && { diseaseDescription }),
    };

    // Insert user
    const result = await collection.insertOne(user);
    
    // Generate token
    const token = jwt.sign(
      { id: result.insertedId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    res.status(201).json({ token, user: userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = db.collection('users');
    
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.hash(password, 10);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all patients (doctors only)
app.get('/api/patients', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const patients = await db.collection('users')
      .find({ role: 'patient' })
      .project({ password: 0 })
      .sort({ registrationDate: -1 })
      .toArray();

    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Error fetching patients' });
  }
});

const PORT = process.env.PORT || 5000;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});