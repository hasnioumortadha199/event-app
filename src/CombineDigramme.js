import React from "react";
 
import DigrammeScreen from "./Diagramme";
import DigrammeScreenTwo from "./Diagramme2";
 import Navbar from "./components/Navbar";
export default function CombinedDigrammeScreens() {
  return (
    <div>
      <Navbar />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      
      <div className="mb-12" style={{ display: "flex", justifyContent: "center" }}>
        <DigrammeScreen />
        {/* <DigrammeScreenTwo /> */}
      </div></div>
    </div>
  );
}