import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import Answer from "./answer";

export default function Globale() {
  const [myCollectionData, setMyCollectionData] = useState([]);
  const [globalData, setGlobalData] = useState(0);

  const handleChange = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, { isPreTest: true });
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
    <div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary" onClick={handleChange}>
          Display
        </button>
        <button className="btn btn-primary" onClick={handleChangetwo}>
          Mask
        </button>
      </div>
      {myCollectionData.map((item) => {
        return <Answer key={item.id} item={item} />;
      })}
    </div>
  );
}
