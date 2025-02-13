import Plan from "../models/Plan";
import connectToDatabase from "../../lib/mongodb";

export async function POST(req) {
  await connectToDatabase();

  try {
    const data = await req.json();
    const plan = new Plan(data);
    const savedPlan = await plan.save();

    return new Response(JSON.stringify(savedPlan), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  await connectToDatabase();

  try {
    const plans = await Plan.find();
    return new Response(JSON.stringify(plans), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
