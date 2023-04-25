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
      await updateDoc(docRef, { index: increment(1) });
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
    <div className="p-5">
      <h1 className="card-title  ">
        Question N ° :{" "}
        {globalData ? (
          <h2 className="card-title  ">{globalData.index + 1}</h2>
        ) : null}
      </h1>

      {myCollectionData.map((item) => (
        <div key={item.id}>
          <p>
            {globalData.index === item.index ? (
              <h2>
                {item.question}
                <h3>
                  {item.answers.map((i, idx) => (
                    <p
                      className={`${
                        globalData.isPreTest === true
                          ? "text-dark"
                          : item.rightAnswer.some((e) => {
                              if (e === idx) {
                                console.log("mmmmmm", idx, e === idx);
                                return true;
                              }
                              return false;
                            }) === true
                          ? "text-green-500"
                          : "text-red-600"
                      }`}
                    >
                      {i}
                    </p>
                  ))}{" "}
                </h3>
              </h2>
            ) : null}
          </p>
        </div>
      ))}
      <button onClick={handleIncrement} className="m-5 btn btn-primary">
        Next
      </button>
    </div>
  );
};
const contains = (List, indx) => {
  List.some((e) => {
    if (e === indx) {
      console.log("mmmmmm", indx, e === indx);
      return true;
    }
    return false;
  });
};
