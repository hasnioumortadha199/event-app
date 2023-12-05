import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db, auth } from "../firebase-config";
export const SendMessage = () => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "questions2");
  const data = {
    response: "newMessage",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDoc(messagesRef, data)
      .then(() => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });

    setNewMessage("");
  };
  return (
    <div className="bg-gray-200  fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSubmit} className="px-10 containerWrap flex">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none "
          type="text"
        ></input>
        <button
          type="submit"
          className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
