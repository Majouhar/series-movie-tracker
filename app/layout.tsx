import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Movie & Series Tracker',
  description: 'Keep track of upcoming movies and TV series.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}