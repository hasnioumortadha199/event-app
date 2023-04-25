import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../style/Chat.css";
import Message from "./Message";

export const Chat = () => {
  const [questions, setQuestions] = useState([]);
  const messagesRef = collection(db, "questions");
  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let questions = [];
      snapshot.forEach((doc) => {
        questions.push({ ...doc.data(), id: doc.id });
      });

      setQuestions(questions);
    });

    return () => unsuscribe();
  }, []);

  return (
    <div>
      {questions.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
