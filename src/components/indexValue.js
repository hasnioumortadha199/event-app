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

export const IndexValue = () => {
  const [myCollectionData, setMyCollectionData] = useState([]);
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const docRef = doc(db, "globalData", "admin-control");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGlobalData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting global data:", error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const q = query(collection(db, "preTest"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyCollectionData(data);
      } catch (error) {
        console.error("Error getting questions:", error);
      }
    };

    fetchGlobalData();
    fetchQuestions();
  }, []);

  const handleNext = async () => {
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
      console.error("Error updating index:", error);
    }
  };

  const currentQuestion = myCollectionData.find(
    (item) => globalData && item.index === globalData.index
  );

  return (
    <div className="p-4 flex flex-col gap-4 ">
      <h1 className="text-4xl font-bold text-[#4f7f80]">
        Question N°: {globalData ? globalData.index + 1 : "Chargement..."}
      </h1>

      {currentQuestion ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">{currentQuestion.question}</h2>
          <ul className="list-decimal pl-5 space-y-2">
            {currentQuestion.answers.map((answer, idx) => (
              <li key={idx} className="text-xl text-gray-700">{answer}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">Aucune question disponible.</p>
      )}

      <div className="self-end mt-4">
        <button
          onClick={handleNext}
          className="px-5 py-2 text-white rounded-md bg-gradient-to-r from-[#97b5a5] via-[#4f7f80] to-[#4f7f80] hover:opacity-90 transition-all duration-300 text-sm"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
