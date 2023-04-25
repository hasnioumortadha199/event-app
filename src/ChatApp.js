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

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="hero min-h-screen  ">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there 👋</h1>
              <p className="py-6">
                Join the conversation , meet new people and make Connection in
                one shared room
              </p>
              <button
                onClick={() => {
                  setIsInChat(true);
                }}
                className="btn"
              >
                Join the conversation
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Room />
        </div>
      )}
    </AppWrapper>
  );
}

export default ChatApp;
