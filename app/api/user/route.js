import connectToDatabase from '../../lib/mongodb' ;
import User from '../models/User';

export async function GET(req) {
  await connectToDatabase();

  try {
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();

  try {
    const { name, email, password, role } = await req.json();

    const newUser = new User({ name, email, password, role });
    const savedUser = await newUser.save();

    return new Response(JSON.stringify(savedUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add user' }), { status: 500 });
  }
}
