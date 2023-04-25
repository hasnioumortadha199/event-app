import { collection, query, orderBy, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

export default function StatScreen() {
  const [users, setUsers] = useState([]);

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
