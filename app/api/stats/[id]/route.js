// pages/api/stats/[id].js

import connectToDatabase from "../../../lib/mongodb";
import Stats from "../../models/Stats";

export async function PATCH(req, { params }) {
  await connectToDatabase();

  try {
    const { id } = params;
    const { label, count, suffix } = await req.json();
    const updatedStat = await Stats.findByIdAndUpdate(
      id,
      { label, count, suffix },
      { new: true }
    );

    if (!updatedStat) {
      return new Response(JSON.stringify({ error: "Stat not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedStat), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update stat" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  try {
    const { id } = params;
    const deletedStat = await Stats.findByIdAndDelete(id);

    if (!deletedStat) {
      return new Response(JSON.stringify({ error: "Stat not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Stat deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete stat" }), {
      status: 500,
    });
  }
}
