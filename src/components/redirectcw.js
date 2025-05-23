// src/pages/CreativeWorldRedirect.jsx
import { useEffect } from "react";

export default function CreativeWorldRedirect() {
  useEffect(() => {
    window.location.href = "https://fmc21.netlify.app/affiche";
  }, []);

  return null;
}
