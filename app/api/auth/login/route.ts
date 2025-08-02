import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma';
import { generateToken } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    const token = generateToken(user.id);
    const response = NextResponse.json({ userId: user.id });
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}