// src/pages/CreativeWorldRedirect.jsx
import { useEffect } from "react";

export default function CreativeWorldRedirect() {
  useEffect(() => {
    window.location.href = "https://firebasestorage.googleapis.com/v0/b/cword-1d3c0.appspot.com/o/app-release.apk?alt=media&token=886e634b-20a7-4bea-9048-7a10edbfb532";
  }, []);

  return null;
}
