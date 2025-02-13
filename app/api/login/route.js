// pages/api/login.js
import jwt from 'jsonwebtoken';
import User from '../models/User';  // Path to your User model
import  connectToDatabase  from '@lib/mongodb'; // A helper function to handle MongoDB connection

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is stored in your .env file

export async function POST(req) {
  const { email, password } = await req.json(); // Extract data from request body

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Please provide both email and password.' }), {
      status: 400,
    });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password. user not found' }), { status: 401 });
    }

    // Compare password using bcrypt
    const isPasswordCorrect = user.password
    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ error: 'Invalid email or password. password is incorrect' }), { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Payload (user ID and role)
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time
    );

    // Return the token
    return new Response(
      JSON.stringify({ token, message: 'Login successful',user:user }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
