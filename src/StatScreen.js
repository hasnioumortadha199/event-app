import { collection, query, orderBy, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function StatScreen() {
  const [users, setUsers] = useState([]);
  const [sumNote, setSumNote] = useState(0);

  const fetchGlobalStats = () => {
    const userQuery = query(collection(db, "users"));
    getDocs(userQuery)
      .then((usersSnap) => {
        let sum = usersSnap.docs.reduce((prevSum, user) => {
          return prevSum + (user.data().notePostTest || 0);
        }, 0);
        setSumNote((sum * 100) / (41 * usersSnap.docs.length));
      })
      .catch((error) => {
        console.error("Error fetching global stats:", error);
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "users"), orderBy("notePostTest", "desc"))
        );
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    fetchGlobalStats();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-6xl font-bold uppercase">Classement</h1>
          <Link to="/statistics/digramme" className=" m-5 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Diagramme Circulaire</Link>
        </div>
      </div>
      <div className="container mx-auto px-4 overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Position</th>
              <th className="p-2">Nom</th>
              <th className="p-2">Note</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">
                  {user.notePostTest} / 41
                </td>
                <td className="p-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
