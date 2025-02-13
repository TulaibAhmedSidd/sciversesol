import connectToDatabase from "./../../../lib/mongodb";
import Brand from "../../models/Brand";
import Product from "../../models/Product"

export async function PATCH(req) {
  await connectToDatabase();

  try {
    const { brandId, name } = await req.json();

    if (!brandId || !name) {
      return new Response(
        JSON.stringify({ error: "Brand ID and name are required" }),
        { status: 400 }
      );
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      { name },
      { new: true }
    );

    if (!updatedBrand) {
      return new Response(JSON.stringify({ error: "Brand not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedBrand), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update Brand" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();

  try {
    //   const { brandId } = await req.json();

    const { id } = params; // Get `id` from the dynamic route
    let brandId = id;
    await connectToDatabase();
    console.log("id from be:", brandId);

    if (!brandId) {
      return new Response(JSON.stringify({ error: "Brand ID is required" }), {
        status: 400,
      });
    }

    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return new Response(JSON.stringify({ error: "Brand not found" }), {
        status: 404,
      });
    }

    // Remove Brand reference from products
    await Product.updateMany({ brand: brandId }, { $unset: { brand: "" } });

    return new Response(
      JSON.stringify({ message: "Brand deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete Brand" }), {
      status: 500,
    });
  }
}
