// src/pages/CreativeWorldRedirect.jsx
import { useEffect } from "react";

export default function CreativeWorldRedirect() {
  useEffect(() => {
    window.location.href = "https://firebasestorage.googleapis.com/v0/b/cword-1d3c0.appspot.com/o/app-release.apk?alt=media&token=d9f441bd-4f50-4d49-a627-df5461d4886e";
  }, []);

  return null;
}
