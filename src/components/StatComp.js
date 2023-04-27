import {
  collection,
  doc,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function StatComp() {
  const [globalData, setGlobalData] = useState({
    index: 0,
    time: true,
    isPreTest: true,
  });
  const [sum, setSum] = useState(0);
  const [nbr, setNbr] = useState(1);

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

  const usersQuery = query(collection(db, "users"));

  useEffect(() => {
    getDocs(usersQuery).then((usersSnap) => {
      let lsum = usersSnap.docs.reduce((partialSum, user) => {
        try {
          let preNoteQues = user.data().preNoteQues[globalData.index];
          return partialSum + preNoteQues.note;
        } catch (err) {
          return partialSum;
        }
      }, 0);
      setNbr(usersSnap.docs.length);
      setSum(lsum);
    });
  }, [globalData]);

  return (
    <div>
      <div>
        {globalData.isPreTest ? (
          <h2>
            {" "}
            <div>
              {" "}
              <div
                className="  radial-progress bg-green-700 text-primary-content border-4 border-green-700"
                style={{
                  "--value": `${(sum / nbr) * 100}`,
                  "--size": "20rem",
                  "--thickness": "16px",
                }}
              >
                <h1 className="text-6xl">
                  {" "}
                  {((sum / nbr) * 100).toFixed(0)} %
                </h1>
              </div>
            </div>{" "}
          </h2>
        ) : null}
      </div>
    </div>
  );
}
