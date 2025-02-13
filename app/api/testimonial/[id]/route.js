import connectToDatabase from '../../../lib/mongodb';
import Testimonial from '../../models/Testimonial';

export async function PATCH(req, { params }) {
    await connectToDatabase();
  
    try {
      const { id } = params;
      const { text, author, approved } = await req.json();
  
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        id,
        { text, author, approved },
        { new: true }
      );
  
      if (!updatedTestimonial) {
        return new Response(JSON.stringify({ error: 'Testimonial not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedTestimonial), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to update testimonial' }), { status: 500 });
    }
  }
  