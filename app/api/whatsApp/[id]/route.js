import connectToDatabase from "../../../lib/mongodb";
import Whatsapp from "../../models/WhatsApp";

export async function PUT(req) {
  await connectToDatabase();
  try {
    const { id, WhatsAppNumber, makePrimary } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID is required for updating." }),
        { status: 400 }
      );
    }

    // If a number is marked as primary, unset any existing primary
    if (makePrimary) {
      await Whatsapp.updateMany({}, { $set: { makePrimary: false } });
    }

    const updatedNumber = await Whatsapp.findByIdAndUpdate(
      id,
      { WhatsAppNumber, makePrimary },
      { new: true }
    );

    if (!updatedNumber) {
      return new Response(JSON.stringify({ error: "Number not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedNumber), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Error updating number: ${error.message}` }),
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  await connectToDatabase();
  try {
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "ID is required for deletion." }),
        { status: 400 }
      );
    }

    const deletedNumber = await Whatsapp.findByIdAndDelete(id);

    if (!deletedNumber) {
      return new Response(JSON.stringify({ error: "Number not found." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Number deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Error deleting number: ${error.message}` }),
      { status: 500 }
    );
  }
}
