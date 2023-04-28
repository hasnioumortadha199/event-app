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
    <div className="p-2">
      <h1 className="card-title text-6xl   ">
        Question N ° :{" "}
        {globalData ? (
          <h2 className="card-title text-6xl">{globalData.index + 1}</h2>
        ) : null}
      </h1>

      {myCollectionData.map((item) => (
        <div key={item.id}>
          <p>
            {globalData.index === item.index ? (
              <div>
                <h2 className="mt-2 text-4xl">{item.question} </h2>
                <h3 h2 className="mt-2 text-4xl">
                  <ul className="list-decimal">
                    {item.answers.map((i, idx) => (
                      <li>{i}</li>
                    ))}
                  </ul>
                </h3>
              </div>
            ) : null}
          </p>
        </div>
      ))}

      <button
        onClick={handleIncrement}
        className="absolute bottom-8 right-8 m-5 btn btn-outline btn-info "
      >
        Next
      </button>
    </div>
  );
};
