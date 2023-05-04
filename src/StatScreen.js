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
        console.log(user.data().notePostTest);
        if (user.data().notePostTest) {
          return prtSum + user.data().notePostTest;
        }
        return prtSum;
      }, 0);
      console.log((sum * 100) / (41 * usersSnap.docs.length));
      setSumNote((sum * 100) / (41 * usersSnap.docs.length));
      setNbr(sum);
    });
  };
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("notePostTest", "desc"));

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
        <h1 className=" m-5 text-6xl font-bold mb-4 uppercase text-center  ">
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
                <td>{user.notePostTest} / 41 </td>
                <td>{user.email} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
