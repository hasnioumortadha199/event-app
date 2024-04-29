import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

export const ColorIndex = () => {
  const [myCollectionData, setMyCollectionData] = useState([]);
  const [globalData, setGlobalData] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "globalData", "admin-control");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGlobalData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getData();
  }, []);

  const handleChangetwo = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, { isPreTest: false });
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        setGlobalData(updatedDocSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error incrementing index:", error);
    }
  };

  const handleIncrement = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, { index: increment(1) });
      handleChangetwo();
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        setGlobalData(updatedDocSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error incrementing index:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "preTest"));
      const querySnapshot = await getDocs(q);
      const collectionData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyCollectionData(collectionData);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-6xl font-bold mb-4">
        Question N°: {globalData ? globalData.index + 1 : null}
      </h1>

      {myCollectionData.map((item) => (
        <div key={item.id}>
          {globalData.index === item.index && (
            <div>
              <h2 className="text-3xl m4">{item.question}</h2>
              <ul className="list-decimal pl-4">
                {item.answers.map((i, idx) => (
                  <li
                    key={idx}
                    className={`text-xl ${
                      item.rightAnswer.includes(idx)
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleIncrement}
        className="px-3 py-1 absolute bottom-8 right-8 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 text-sm"
      >
        Next
      </button>
    </div>
  );
};
