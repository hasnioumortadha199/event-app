import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function StatFonc({ item }) {
  const [sum, setSum] = useState(0);
  const [globalData, setGlobalData] = useState({
    isPreTest: false,
    index: 0,
    time: true,
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "globalData", "admin-control"), (doc) => {
      if (doc) {
        let data = doc.data();
        setGlobalData(data);
        getAnswers();
      } else {
      }
    });

    return () => {
      unsub();
    };
  }, [item]);

  console.log();

  const getAnswers = (users) => {
    // .reduce((partialSum, a) => partialSum + a, 0);
    users.reduce(
      (pqrSum, user) => pqrSum + user.postNoteQues[globalData.index].note,
      0
    );
  };

  return <div>{globalData.isPreTest ? <h2> {sum} </h2> : null}</div>;
}
