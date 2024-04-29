import React, { useState } from "react";
import { Chat } from "./components/Chat.js";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";

import Room from "./Room.js";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);

   

  return (
  <div><Room/></div>
  );
}

export default ChatApp;
