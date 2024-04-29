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

export const IndexValue = () => {
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

  const handleIncrement = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, {
        index: increment(1),
        isPreTest: false,
      });
      console.log("Document updated successfully.");
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
    <div className="p-2 flex flex-col">
      <h1 className="text-6xl font-bold mb-2">Question N°: {globalData ? globalData.index + 1 : null}</h1>

      {myCollectionData.map((item) => (
        <div key={item.id}>
          {globalData.index === item.index && (
            <div>
              <h2 className="text-3xl m-4">{item.question}</h2>
              <ul className="list-decimal pl-4">
                {item.answers.map((i, idx) => (
                  <li key={idx} className="text-gray-700 text-xl">{i}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleIncrement}
        className="px-3 py-1 self-end bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 text-sm"
      >
        Next
      </button>
    </div>
  );
};
