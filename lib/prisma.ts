import { PrismaClient } from '@prisma/client';

// Create a single Prisma client instance.  In a Next.js serverless
// environment, instantiating a new client for every request is expensive and
// may exhaust database connections.  We instead attach the client to the
// global object in development.  See the Prisma docs for more details.

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;