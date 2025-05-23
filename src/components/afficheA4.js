import React from "react";

export default function A4PageTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 print:p-0 print:bg-white">
      <div
        className="bg-white shadow border overflow-hidden print:shadow-none print:border-none"
        style={{
          width: "794px", // A4 width in pixels
          height: "1123px", // A4 height in pixels
        }}
      >
        <img
          src="affiche.png" // replace with your image path or URL
          alt="A4 format"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
