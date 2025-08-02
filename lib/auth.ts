import jwt from 'jsonwebtoken';
import type { NextApiRequest } from 'next';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

/**
 * Sign a JSON web token for the given user ID.
 */
export function generateToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
}

/**
 * Verify a JSON web token.  Returns the decoded payload or null if invalid.
 */
export function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (err) {
    return null;
  }
}

/**
 * Parse the `token` cookie from the request and return the associated user.
 */
export async function getUserFromRequest(req: NextApiRequest) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
    const [name, ...rest] = part.trim().split('=');
    acc[name] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});
  const token = cookies['token'];
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  try {
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    return user;
  } catch (err) {
    return null;
  }
}