import React from "react";

function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <img
        src="/assets/wallpaper1.webp"
        alt="Spiderverse"
        className="w-full h-full object-cover object-center"
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}

export default Background;
