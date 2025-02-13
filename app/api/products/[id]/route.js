// import clientPromise from '../../../lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function PATCH(req, { params }) {
//     try {
//         const client = await clientPromise;
//         const db = client.db('products_db');
//         const { id } = params;
//         const updatedData = await req.json();

//         const result = await db
//             .collection('products')
//             .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

//         return new Response(JSON.stringify(result), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
//     }
// }

// export async function DELETE(req, { params }) {
//     try {
//         const client = await clientPromise;
//         const db = client.db('products_db');
//         const { id } = params;

//         const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

//         return new Response(JSON.stringify(result), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
//     }
// }

import connectToDatabase from '../../../lib/mongodb';
import Product from '../../models/Product';

// export async function PATCH(req, { params }) {
//   await connectToDatabase();

//   try {
//     const { id } = params;
//     const updateData = await req.json();

//     const updatedProduct = await Product.updateOne(
//       { 'items.id': id }, // Match item by `id`
//       { $set: { 'items.$': updateData } } // Update matching item
//     );

//     return new Response(JSON.stringify(updatedProduct), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
//   }
// }

export async function PATCH(req) {
  await connectToDatabase();

  try {
    const { productId, updatedFields } = await req.json();

    if (!productId) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields, {
      new: true,
    }).populate('category'); // Populate category details if categoryId is updated

    if (!updatedProduct) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update product' }), { status: 500 });
  }
}

// export async function DELETE(req, { params }) {
//   await connectToDatabase();

//   try {
//     const { id } = params;

//     const deletedProduct = await Product.updateOne(
//       {},
//       { $pull: { items: { id } } } // Remove item with matching `id`
//     );

//     return new Response(JSON.stringify(deletedProduct), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
//   }
// }


export async function DELETE(req,{params}) {
  await connectToDatabase();

  try {
    // const { productId } = await req.json();
    const { id } = params; // Get `id` from the dynamic route
    let productId = id;
    
    console.log("id from be:", productId);
    if (!productId) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), { status: 500 });
  }
}

