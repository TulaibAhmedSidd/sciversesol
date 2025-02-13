import connectToDatabase from '../../lib/mongodb';
import Testimonial from '../models/Testimonial';

export async function GET(req) {
  await connectToDatabase();

//   const isAdmin = req.headers.get('x-is-admin'); // Simulating admin authentication for simplicity
//   const filter = isAdmin === 'true' ? {} : { approved: true };

  try {
    const testimonials = await Testimonial.find();
    return new Response(JSON.stringify(testimonials), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch testimonials' }), { status: 500 });
  }
}
export async function POST(req) {
    await connectToDatabase();
  
    try {
      const { text, author } = await req.json();
  
      const newTestimonial = new Testimonial({ text, author, approved: false });
      const savedTestimonial = await newTestimonial.save();
  
      return new Response(JSON.stringify(savedTestimonial), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to add testimonial' }), { status: 500 });
    }
  }
  