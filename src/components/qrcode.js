import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [link, setLink] = useState("https://example.com");
  const qrRef = useRef(null);
  const qrSize = 1000; // Large resolution (1000x1000 px)

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");

    // Create a new high-resolution canvas
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = qrSize;
    exportCanvas.height = qrSize;
    const ctx = exportCanvas.getContext("2d");

    // Draw the existing canvas onto the new larger canvas
    ctx.drawImage(canvas, 0, 0, qrSize, qrSize);

    // Convert to PNG and trigger download
    const pngUrl = exportCanvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code-large.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">High-Res QR Code Generator</h1>

      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter your link"
        className="border p-2 rounded w-full max-w-md mb-4"
      />

      <div ref={qrRef} className="bg-white p-4 shadow rounded mb-4">
        <QRCodeCanvas value={link} size={qrSize} />
      </div>

      <button
        onClick={downloadQRCode}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Download High-Res PNG
      </button>
    </div>
  );
}
