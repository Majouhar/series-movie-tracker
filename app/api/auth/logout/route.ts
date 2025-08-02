import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the token cookie by setting it to an empty value with immediate expiration.
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}