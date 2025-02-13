// pages/api/login.js

// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   const { email, password } = await req.json();

//   // Check if credentials are correct (this is just an example, ideally use a secure method)
//   if (email === 'admin@example.com' && password === 'admin123') {
//     // On successful login, generate a token (for example)
//     const token = 'sample-jwt-token'; // Replace with a real JWT
//     return NextResponse.json({ token });
//   }

//   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
// }

//above is simple hardcode api

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';  // Path to your User model
import  connectToDatabase  from '@lib/mongodb'; // A helper function to handle MongoDB connection

const JWT_SECRET = process.env.JWT_SECRET || 'abc123'; // Ensure this is stored in your .env file

// Connect to MongoDB database
// const connectToDatabase = async () => {
//   if (mongoose.connection.readyState >= 1) return;
//   await mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

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
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
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
