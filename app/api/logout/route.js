import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const cookieStore = cookies();
    // Clear the JWT cookie by setting it to an empty value and an expired date
    cookieStore.delete('admin-auth-token');
    
    // Return a response confirming logout
    return new Response(JSON.stringify({ message: 'Logout successful' }), { status: 200 });
  } catch (error) {
    console.error('Logout Error:', error);
    return new Response(JSON.stringify({ error: 'Logout failed' }), { status: 500 });
  }
}
