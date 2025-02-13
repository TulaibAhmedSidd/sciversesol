import Plan from "../../models/Plan";
import connectToDatabase from '../../../lib/mongodb'

export async function PUT(req, { params }) {
    await connectToDatabase();
  
    try {
      const { id } = params;
      const data = await req.json();
      const updatedPlan = await Plan.findByIdAndUpdate(id, data, { new: true });
  
      if (!updatedPlan) {
        return new Response(JSON.stringify({ error: "Plan not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedPlan), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  
  export async function DELETE(req, { params }) {
    await connectToDatabase();
  
    try {
      const { id } = params;
      const deletedPlan = await Plan.findByIdAndDelete(id);
  
      if (!deletedPlan) {
        return new Response(JSON.stringify({ error: "Plan not found" }), { status: 404 });
      }
  
      return new Response(
        JSON.stringify({ message: "Plan deleted successfully" }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  