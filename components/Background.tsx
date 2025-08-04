"use client";
import React, { useEffect, useState } from "react";

const assets = [
  { id: 1, src: "/assets/wp-spidey1.webp" },
  { id: 2, src: "/assets/wp-spidey2.webp" },
  { id: 3, src: "/assets/wp-spidey3.webp" },
  { id: 4, src: "/assets/wp-spidey4.webp" },
  { id: 5, src: "/assets/wp-spidey5.webp" },
];

function Background() {
  const [bg, setBg] = useState(1);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlur(true); // Start blur transition

      setTimeout(() => {
        // Change background
        setBg((prevBg) => {
          const others = assets.filter((a) => a.id !== prevBg);
          const next = others[Math.floor(Math.random() * others.length)];
          return next.id;
        });
        setBlur(false); // Remove blur after change
      }, 300); // blur duration in ms
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const currentImage = assets.find((img) => img.id === bg)?.src;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        src={currentImage}
        alt="Spiderverse"
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${
          blur ? "blur-md opacity-60" : "blur-0 opacity-100"
        }`}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}

export default Background;
