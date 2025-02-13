import connectToDatabase from '../../lib/mongodb';
import Brand from '../models/Brand';

export async function GET(req) {
  await connectToDatabase();

  try {
    const brands = await Brand.find({});
    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch brands' }), { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();

  try {
    const { name } = await req.json();

    const newBrand = new Brand({ name });
    const savedBrand = await newBrand.save();

    return new Response(JSON.stringify(savedBrand), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add Brand' }), { status: 500 });
  }
}
