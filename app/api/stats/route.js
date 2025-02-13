// pages/api/stats.js

import connectToDatabase from '../../lib/mongodb';
import Stats from '../models/Stats';

export async function GET(req) {
  await connectToDatabase();

  try {
    const stats = await Stats.find({});
    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();

  try {
    const { label, count, suffix } = await req.json();
    const newStat = new Stats({ label, count, suffix });
    const savedStat = await newStat.save();

    return new Response(JSON.stringify(savedStat), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add stat' }), { status: 500 });
  }
}
