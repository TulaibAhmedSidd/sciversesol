import connectToDatabase from '../../lib/mongodb';
import Whatsapp from '../models/WhatsApp';

export async function GET() {
    try {
      await connectToDatabase();
  
      const numbers = await Whatsapp.find();
      return new Response(JSON.stringify(numbers), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `Error fetching numbers: ${error.message}` }),
        { status: 500 }
      );
    }
  }
  
export async function POST(req) {
    try {
      const { WhatsAppNumber, makePrimary } = await req.json();
  
      if (!WhatsAppNumber) {
        return new Response(
          JSON.stringify({ error: "WhatsApp number is required." }),
          { status: 400 }
        );
      }
  
      // Connect to database
      await connectToDatabase();
  
      // If a number is marked as primary, unset any existing primary
      if (makePrimary) {
        await Whatsapp.updateMany({}, { $set: { makePrimary: false } });
      }
  
      const newNumber = await Whatsapp.create({ WhatsAppNumber, makePrimary });
  
      return new Response(JSON.stringify(newNumber), { status: 201 });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `Error adding WhatsApp number: ${error.message}` }),
        { status: 500 }
      );
    }
  }
  