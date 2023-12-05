import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const GoToGere = () => {
    navigate("/gere");
  };
  const GoToChat = () => {
    navigate("/chat");
  };
  const GoToStat = () => {
    navigate("/stat");
  };
  return (
    <div className=" flex justify-center">
      <div className=" ">
        <div className="card w-96 bg-base-100 shadow-xl m-3 p-3">
          <div className="card-body ">
            <h2 className="card-title">Chat</h2>
            <p> Allez sur le chat et répondez aux réponses</p>
            <div className="card-actions justify-end">
              <button onClick={GoToChat} className="btn btn-primary">
                Chat
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
