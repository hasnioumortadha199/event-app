import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase-config";

export const AfficheQues = ({ test }) => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>

        <div className="chat-bubble dropdown">
          <label tabIndex={0}>{test.question}</label>
          <ul
            tabIndex={0}
            className="dropdown-content p-2 shadow bg-base-100 rounded-box  "
          >
            <li>
              <div>
                <label className="label">
                  <span className="label-text">Enter Réponse</span>
                </label>
                <label className="input-group"></label>
              </div>
            </li>
          </ul>
        </div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>

      <div className="chat chat-end"></div>
    </div>
  );
};

export default AfficheQues;
