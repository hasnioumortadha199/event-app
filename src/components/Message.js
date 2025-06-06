import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase-config";

export const Message = ({ message }) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = doc(db, "questions-20eme", message.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(messagesRef, {
      response: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="p-4 space-y-6">
       <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
           <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
        </div>
        <div className="chat-header font-semibold text-gray-700">
          {message.userName}
        </div>
        <div className="chat-bubble bg-[#4f7f80] text-white relative dropdown">
          <label tabIndex={0}>{message.question}</label>
          <ul
            tabIndex={0}
            className="dropdown-content mt-2 z-[1] p-2 shadow bg-white rounded-box w-72 space-y-2"
          >
            <li>
              <form onSubmit={handleSubmit} className="space-y-2">
                <label className="label">
                  <span className="label-text text-gray-700">Entrez votre réponse</span>
                </label>
                <div className="flex gap-2">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    className="input input-bordered flex-grow text-black"
                    placeholder="Votre réponse..."
                  />
                  <button
                    type="submit"
                    className="bg-[#4f7f80] text-white   py-1 rounded-md text-sm hover:opacity-90 transition-all"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
        <div className="chat-footer text-xs opacity-60">Reçu</div>
      </div>

      {/* Professeur */}
      {message.response && message.response.length > 0 && (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full bg-gray-300"></div>
          </div>
          <div className="chat-header font-semibold text-gray-700">Prof</div>
          <div className="chat-bubble bg-[#97b5a5] text-white">
            {message.response}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
