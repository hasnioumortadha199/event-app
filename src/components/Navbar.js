import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#97b5a5] via-[#4f7f80] to-[#4f7f80] py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="/">
          <img className="h-16" src="/titre.png" alt="20 éme Cours International FMC" />
        </a>
        <h1 className="text-white text-xl">21 éme Cours International FMC</h1>
      </div>
    </nav>
  );
}
