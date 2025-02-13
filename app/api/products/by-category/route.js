// app/api/products/by-category/route.js

import connectToDatabase from "../../../lib/mongodb";
import Category from "../../models/Category";
import Product from "../../models/Product";
import Brand from "../../models/Brand"; // Ensure Brand model is imported

// export async function GET(req) {
//   try {
//     await connectToDatabase();

//     // Fetch categories and group products by category
//     const categories = await Category.find();
//     const brand = await Brand.find();

//     const productsByCategory = await Promise.all(
//       categories.map(async (category) => {
//         const products = await Product.find({ category: category._id })
//           .select("-__v") // Exclude unwanted fields like `__v`
//           .populate("brand", "name"); // Populate brand field and only fetch its `name`

//         return {
//           category: category.name,
//           items: products.map((product) => ({
//             id: product._id,
//             name: product.name,
//             brand: product.brand.name, // Access the populated brand's name
//             wattage: product.wattage,
//             size: product.size,
//             price: product.price,
//             image: product.image,
//           })),
//         };
//       })
//     );

//     return new Response(JSON.stringify(productsByCategory), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// app/api/products/by-category/route.js
// export async function GET(req) {
//   const url = new URL(req.url);
//   const page = parseInt(url.searchParams.get("page") || "1");
//   const limit = parseInt(url.searchParams.get("limit") || "10");
//   const categoryId = url.searchParams.get("categoryId"); // Get category ID from query params

//   if (!categoryId) {
//     return new Response(
//       JSON.stringify({ error: "categoryId query parameter is required" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   try {
//     await connectToDatabase();

//     // Query products based on the categoryId
//     const products = await Product.find({ category: categoryId })
//       .select("-__v")
//       .skip((page - 1) * limit)
//       .limit(limit);

//     // Get the total number of products in the selected category
//     const totalProducts = await Product.countDocuments({ category: categoryId });

//     return new Response(
//       JSON.stringify({
//         products,
//         totalProducts,
//         currentPage: page,
//         limit,
//       }),
//       { status: 200, headers: { "Content-Type": "application/json" } }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const categoryId = url.searchParams.get("categoryId");
  const minPrice = parseFloat(url.searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(url.searchParams.get("maxPrice") || "99999");

  try {
    await connectToDatabase();

    let query = {}; // Initialize query object

    // Add filters to the query
    if (categoryId) {
      query.category = categoryId; // Filter by categoryId
    }
    if (minPrice || maxPrice) {
      query.price = {}; // Initialize price filter
      if (minPrice) query.price.$gte = minPrice; // Filter products greater than or equal to minPrice
      if (maxPrice) query.price.$lte = maxPrice; // Filter products less than or equal to maxPrice
    }

    // Fetch the filtered products with pagination
    const products = await Product.find(query)
      .select("-__v")
      .populate("brand", "name") // Populate brand field and only fetch its `name`
      .skip((page - 1) * limit)
      .limit(limit);

    // Count the total products matching the query
    const totalProducts = await Product.countDocuments(query);

    return new Response(
      JSON.stringify({
        products,
        totalProducts,
        currentPage: page,
        limit,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
