import React from "react";

import { Chat } from "./components/Chat";
import Navbar from "./components/Navbar";

function Room() {
  return (
    <div>   <Navbar/>
    <div className="container mx-auto px-4">
      <Chat />
    </div></div>
  );
}

export default Room;
