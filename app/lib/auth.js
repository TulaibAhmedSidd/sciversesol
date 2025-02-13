// lib/auth.js
import { NextResponse } from 'next/server';

export const isAuthenticated = (req) => {
  // Check if user is authenticated (e.g., check session or cookie)
  const cookie = req?.cookies?.get('admin-auth-token'); // Example cookie
  return cookie ? true : false;
};
export const isAuthenticatedMyWay = (req) => {
  // Check if user is authenticated (e.g., check session or cookie)
  return req ? true : false;
};

export const redirectToLogin = () => {
  return NextResponse.redirect('/login');
};
