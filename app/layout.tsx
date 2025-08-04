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
        <div className="fixed inset-0 -z-10">
          <img
            src="/assets/wallpaper1.webp"
            alt="Spiderverse"
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        {/* Main app */}
        <main className="relative  z-10">{children}</main>
      </body>
    </html>
  );
}
