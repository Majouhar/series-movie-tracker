import Background from "../components/Background";
import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Movie & Series Tracker",
  description: "Keep track of upcoming movies and TV series.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Background */}
        <Background />
        {/* Main app */}
        <main className="relative  z-10">{children}</main>
      </body>
    </html>
  );
}
