import connectToDatabase from '../../lib/mongodb';
import Category from '../models/Category';

export async function GET(req) {
  await connectToDatabase();

  try {
    const categories = await Category.find({});
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();

  try {
    const { name } = await req.json();

    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();

    return new Response(JSON.stringify(savedCategory), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to add category' }), { status: 500 });
  }
}
