import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { verifyToken, generateToken } from '../../../lib/auth';
import { getOMDbDetails } from '../../../lib/omdb';

import { cookies } from 'next/headers';

// Helper to extract user ID from cookies
async function getUserIdFromCookies(): Promise<number | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

export async function GET() {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const items = await prisma.item.findMany({
      where: { userId },
      select: {
        id: true,
        imdbId: true,
        title: true,
        type: true,
        releaseDate: true,
        poster: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ items });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { imdbId } = body;
    if (!imdbId) {
      return NextResponse.json({ message: 'Missing imdbId' }, { status: 400 });
    }
    // Check if item already exists for this user
    const existing = await prisma.item.findUnique({ where: { imdbId } });
    if (existing) {
      // If the existing item belongs to the same user, return success; else error
      if (existing.userId === userId) {
        return NextResponse.json({ item: existing });
      } else {
        return NextResponse.json({ message: 'Item already exists' }, { status: 400 });
      }
    }
    // Fetch details from OMDb
    const details = await getOMDbDetails(imdbId);
    if (!details) {
      return NextResponse.json({ message: 'Unable to fetch details' }, { status: 400 });
    }
    const { title, type, releaseDate, poster } = details;
    const created = await prisma.item.create({
      data: {
        imdbId,
        title,
        type: type.toUpperCase() as any,
        releaseDate: releaseDate ?? null,
        poster,
        userId,
      },
    });
    return NextResponse.json({ item: created });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}