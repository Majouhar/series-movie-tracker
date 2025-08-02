# Movie & Series Tracker

This is a full‑stack web application built with **Next.js** (App Router & Pages Router), **Tailwind CSS**, and **PostgreSQL** via **Prisma**.  The goal of the project is to allow users to maintain their own personal lists of upcoming movies and TV series.  The app integrates with the [OMDb API](https://www.omdbapi.com/) to fetch movie and series information.

## Features

- **User authentication** – sign up, log in and log out using email and password.  Passwords are securely hashed on the server using `bcryptjs` and a JSON web token (JWT) is issued via an HttpOnly cookie.
- **Dashboard** – after logging in, users see two tabs for **Movies** and **Series**.  Each tab lists the items they have added.
- **Search** – there is a search page where users can look up movies or series from the OMDb API.  Results show whether the item has already been released or how many days remain until its release.
- **Add items** – from the search results users can click to add a movie or series to their dashboard.  Only logged‑in users can add items.
- **Responsive design** – the UI uses Tailwind CSS to look great on mobile, tablet and desktop.
- **Decoupled API logic** – all communication with the OMDb API is encapsulated in a helper (in `lib/omdb.ts`).  If you decide to change to another third‑party API later, you only need to modify this helper and the rest of the app will continue to work.

## Project structure

```
movie-series-tracker/
├── components/            // Reusable UI components
├── lib/                   // Database and API helpers
├── app/                   // Next.js app router (routing)
│   ├── layout.tsx         // Root layout applied to all pages
│   ├── page.tsx           // Landing page
│   ├── login/page.tsx     // Login page (client component)
│   ├── signup/page.tsx    // Sign‑up page (client component)
│   ├── dashboard/page.tsx // Authenticated dashboard (client component)
│   ├── search/page.tsx    // Search page (client component)
│   └── api/               // API routes defined under app (using route.ts)
│       ├── auth/…         // Authentication routes (login, signup, logout)
│       ├── items/route.ts // CRUD operations for user items
│       └── search/route.ts// Proxy to OMDb search API
├── prisma/
│   └── schema.prisma      // Prisma schema (database models)
├── public/
├── styles/
│   └── globals.css        // Tailwind directives and global styles
├── tailwind.config.js
├── postcss.config.js
├── .env.example           // Example environment variables
└── README.md
```

## Getting started

To run the project locally you need **Node.js v22** or newer and **PostgreSQL**.  If you don’t already have Postgres installed, you can obtain it from [postgresql.org](https://www.postgresql.org/download/).

1. **Clone the repo and install dependencies:**

   ```bash
   cd movie-series-tracker
   npm install
   ```

2. **Create your `.env` file:**

   Copy `.env.example` to `.env` and fill in the values for `DATABASE_URL`, `OMDB_API_KEY` and `JWT_SECRET`.  The `DATABASE_URL` should point to a Postgres database you own.  For example:

   ```env
   DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/movie_tracker
   OMDB_API_KEY=your_omdb_api_key
   JWT_SECRET=some_really_long_random_string
   ```

3. **Set up the database:**

   Create the Postgres database referenced in `DATABASE_URL` if it doesn’t exist.  Then run the Prisma migration to generate tables:

   ```bash
   npx prisma migrate dev --name init
   ```

   This command will read `prisma/schema.prisma` and create the required `User` and `Item` tables.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open your browser at <http://localhost:3000>.  You should see the landing page.  From there you can sign up and start adding movies and series.

## Deployment

This project can be deployed to [Vercel](https://vercel.com/) out of the box.  Make sure to set the same environment variables (`DATABASE_URL`, `OMDB_API_KEY`, `JWT_SECRET`) in the Vercel dashboard.  When deploying to Vercel, we recommend using their built‑in Postgres integration or another managed Postgres provider.  See the Vercel documentation for details.

If you cannot deploy to Vercel, you can still build a production version locally:

```bash
npm run build
npm start
```

The `build` script compiles the Next.js app and the `start` script serves the compiled production build.

## SQL schema

The Prisma schema describes two models (`User` and `Item`) and one enum (`ItemType`).  Prisma generates SQL migrations from this schema, so you do not need to write raw SQL yourself.  After running `npx prisma migrate dev --name init` your database will have the following tables (simplified):

```
-- Users table
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Items table
CREATE TABLE "Item" (
  "id" SERIAL PRIMARY KEY,
  "imdbId" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "releaseDate" TIMESTAMP,
  "poster" TEXT,
  "userId" INTEGER NOT NULL REFERENCES "User" ("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Enum definition for ItemType
CREATE TYPE "ItemType" AS ENUM ('MOVIE', 'SERIES');
```

## License

This project is provided as open source under the MIT license.  Feel free to fork it, use it for learning, or adapt it for your own personal watchlist app.