import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Movie & Series Tracker",
  description: "Keep track of upcoming movies and TV series.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}
