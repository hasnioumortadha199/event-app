import { collection, query, orderBy, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

export default function StatScreen() {
  const [users, setUsers] = useState([]);
  const [nbr, setNbr] = useState(1);
  const [globalData, setGlobalData] = useState({
    index: 0,
    time: true,
    isPreTest: true,
  });

  const [sumNote, setSumNote] = useState(0);

  const getGlobalStats = () => {
    const userQuery = query(collection(db, "users"));
    getDocs(userQuery).then((usersSnap) => {
      let sum = usersSnap.docs.reduce((prtSum, user) => {
        console.log(user.data().notePreTest);
        if (user.data().notePreTest) {
          return prtSum + user.data().notePreTest;
        }
        return prtSum;
      }, 0);
      console.log((sum * 100) / (48 * usersSnap.docs.length));
      setSumNote((sum * 100) / (48 * usersSnap.docs.length));
    });
  };
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("notePreTest", "desc"));

    getDocs(q)
      .then((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setUsers(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="  p-6">
        <button onClick={getGlobalStats} className="btn btn-outline btn-info">
          Démarer
        </button>
        <div className="flex justify-center container mx-auto px-4 overflow-x-auto justify-center">
          <div
            className="justify-center radial-progress bg-green-700 text-primary-content border-4 border-green-700"
            style={{ "--size": "28rem", "--value": `${sumNote}` }}
          >
            {sumNote} %
          </div>

          <div
            className="m-5 radial-progress bg-red-700 text-primary-content border-4 border-red-700"
            style={{ "--size": "28rem", "--value": `${100 - sumNote}` }}
          >
            {100 - sumNote} %
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4 uppercase text-center  ">
          {" "}
          Classement
        </h1>
      </div>
      <div className=" container mx-auto px-4 overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Note</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.notePreTest} / 48 </td>
                <td>{user.email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
