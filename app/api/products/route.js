// import clientPromise from '../../lib/mongodb';

// export async function GET(req) {
//     try {
//         const client = await clientPromise;
//         const db = client.db('products_db');
//         const products = await db.collection('products').find({}).toArray();
//         return new Response(JSON.stringify(products), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify(error+' <=> '+{ error: 'Failed to fetch products' }), { status: 500 });
//     }
// }

// export async function POST(req) {
//     try {
//         const client = await clientPromise;
//         const db = client.db('products_db');
//         const newProduct = await req.json(); // Parse JSON body
//         const result = await db.collection('products').insertOne(newProduct);
//         return new Response(JSON.stringify(result), { status: 201 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: 'Failed to add product' }), { status: 500 });
//     }
// }

// second work also working

// import connectToDatabase from '../../lib/mongodb';
// import Product from '../models/Product';

// export async function GET(req) {
//   await connectToDatabase();

//   try {
//     const products = await Product.find({});
//     return new Response(JSON.stringify(products), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
//   }
// }

// export async function POST(req) {
//   await connectToDatabase();

//   try {
//     const { category, items } = await req.json(); // Parse the body
//     const newProduct = new Product({ category, items });
//     const savedProduct = await newProduct.save();

//     return new Response(JSON.stringify(savedProduct), { status: 201 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to add product' }), { status: 500 });
//   }
// }

import connectToDatabase from "../../lib/mongodb";
import Product from "../models/Product";
import Category from "../models/Category";
import Brand from "../models/Brand";

export async function GET(req) {
  await connectToDatabase();

  try {
    const products = await Product.find({}).populate(["category",'brand']); // Populate category details
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await connectToDatabase();

  try {
    const { name, brandId, wattage, size, price, image, categoryId } =
      await req.json();

    // Ensure the category exists
    const category = await Category.findById(categoryId);
    const brand = await Brand.findById(brandId);
    if (!category) {
      return new Response(JSON.stringify({ error: "Invalid category ID" }), {
        status: 400,
      });
    }
    if (!brand) {
      return new Response(JSON.stringify({ error: "Invalid brand ID" }), {
        status: 400,
      });
    }

    const newProduct = new Product({
      name,
      brand: brandId,
      wattage,
      size,
      price,
      image,
      category: categoryId,
    });
    const savedProduct = await newProduct.save();

    return new Response(JSON.stringify(savedProduct), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add product => " + error }),
      { status: 500 }
    );
  }
}
