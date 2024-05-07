import React from "react";
 
import DigrammeScreen from "./Diagramme";
import DigrammeScreenTwo from "./Diagramme2";
import NavbarT from "./components/NavbarTwo";
export default function CombinedDigrammeScreens() {
  return (
    <div>
      <NavbarT />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      
      <div className="mb-12" style={{ display: "flex", justifyContent: "center" }}>
        <DigrammeScreen />
        <DigrammeScreenTwo />
      </div></div>
    </div>
  );
}