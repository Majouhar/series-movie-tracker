import { NextResponse } from 'next/server';
import { searchOMDb } from '../../../lib/omdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const type = (searchParams.get('type') || 'movie') as 'movie' | 'series';
  if (!q) {
    return NextResponse.json({ results: [] });
  }
  try {
    const results = await searchOMDb(q, type);
    return NextResponse.json({ results });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}