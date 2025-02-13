import connectToDatabase from "../../../lib/mongodb";
import Category from "../../models/Category";
import Product from "../../models/Product"

export async function PATCH(req) {
  await connectToDatabase();

  try {
    const { categoryId, name } = await req.json();

    if (!categoryId || !name) {
      return new Response(
        JSON.stringify({ error: "Category ID and name are required" }),
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update category" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();

  try {

    const { id } = params; // Get `id` from the dynamic route
    let categoryId = id;
    await connectToDatabase();
    console.log("id from be:", categoryId);
    if (!categoryId) {
      return new Response(
        JSON.stringify({ error: "Category ID is required" }),
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }

    // Remove category reference from products
    await Product.updateMany(
      { category: categoryId },
      { $unset: { category: "" } }
    );

    return new Response(
      JSON.stringify({ message: "Category deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete category => " + error }),
      { status: 500 }
    );
  }
}
