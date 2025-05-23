import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

export const ColorIndex = () => {
  const [myCollectionData, setMyCollectionData] = useState([]);
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const docRef = doc(db, "globalData", "admin-control");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGlobalData(docSnap.data());
        }
      } catch (error) {
        console.error("Error getting global data:", error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const q = query(collection(db, "preTest"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyCollectionData(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchGlobalData();
    fetchQuestions();
  }, []);

  const handleIncrement = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, {
        index: increment(1),
        isPreTest: false,
      });
      const updatedSnap = await getDoc(docRef);
      if (updatedSnap.exists()) {
        setGlobalData(updatedSnap.data());
      }
    } catch (error) {
      console.error("Error incrementing index:", error);
    }
  };

  const currentQuestion = myCollectionData.find(
    (item) => globalData && item.index === globalData.index
  );

  return (
    <div className="p-4 ">
      <h1 className="text-5xl font-bold text-[#4f7f80] mb-4">
        Question N°: {globalData ? globalData.index + 1 : "Chargement..."}
      </h1>

      {currentQuestion ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            {currentQuestion.question}
          </h2>
          <ul className="list-decimal pl-5 space-y-2">
            {currentQuestion.answers.map((answer, idx) => (
              <li
                key={idx}
                className={`text-lg ${
                  currentQuestion.rightAnswer.includes(idx)
                    ? "text-green-600 font-semibold"
                    : "text-red-500"
                }`}
              >
                {answer}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">Aucune question disponible.</p>
      )}

      <button
        onClick={handleIncrement}
        className="px-4 py-2 absolute bottom-4 right-4 text-white rounded-md bg-gradient-to-r from-[#97b5a5] via-[#4f7f80] to-[#4f7f80] hover:opacity-90 transition-all duration-300 text-sm"
      >
        Next
      </button>
    </div>
  );
};
