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
        <div className="hero min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Chat Room</h1>
            <p className="text-gray-600 mb-8">Join the conversation, meet new people, and make connections in one shared room.</p>
            <button
              onClick={() => {
                setIsInChat(true);
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Join the Conversation
            </button>
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
