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
      setNbr(sum);
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
          Afficher
        </button>
        <div className="flex justify-center container mx-auto px-4 overflow-x-auto justify-center">
          <div
            className="justify-center radial-progress bg-green-700 text-primary-content border-4 border-green-700"
            style={{ "--size": "28rem", "--value": `${sumNote}` }}
          >
            <h1 className="text-9xl">{sumNote.toFixed(0)} %</h1>
          </div>

          <div
            className="m-5 radial-progress bg-red-700 text-primary-content border-4 border-red-700"
            style={{ "--size": "28rem", "--value": `${100 - sumNote}` }}
          >
            <h1 className="text-9xl">{100 - sumNote.toFixed(0)} %</h1>
          </div>
        </div>
        <div className="flex justify-center m-5 ">
          <div className="stats shadow ">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.5 12.75l6 6 9-13.5"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Reponse Correct </div>
              <div className="stat-value">{nbr}</div>
              <div className="stat-desc">{sumNote.toFixed(0)} % </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Reponse False</div>
              <div className="stat-value">{users.length * 48 - nbr}</div>
              <div className="stat-desc">{100 - sumNote.toFixed(0)} %</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Nombre De Candidat</div>
              <div className="stat-value">{users.length}</div>
              <div className="stat-desc">+ {users.length}</div>
            </div>
          </div>
        </div>
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
