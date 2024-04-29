import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function Answer({ item }) {
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
      } else {
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const getAnswers = (item) => {
    let ans = [];
    item.rightAnswer.map((idx) => {
      ans.push(item.answers[idx]);
    });
    return ans;
  };

  let ans = getAnswers(item);

  return (
    <div>
      {ans.map((v, idx) => {
        return (
          <h1 key={`${item.id}_${idx}`}>
            <p>
              {}
              {globalData.isPreTest && globalData.index === item.index ? (
                <h2 className="text-green-500">{v}</h2>
              ) : null}
            </p>
          </h1>
        );
      })}
    </div>
  );
}
