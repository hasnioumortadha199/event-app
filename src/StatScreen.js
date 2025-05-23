import { collection, query, orderBy, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";

export default function StatScreen() {
  const [users, setUsers] = useState([]);
  const [averageNote, setAverageNote] = useState(0);

  const fetchGlobalStats = () => {
    const userQuery = query(collection(db, "users"));
    getDocs(userQuery)
      .then((snap) => {
        const totalUsers = snap.docs.length;
        const totalNote = snap.docs.reduce(
          (sum, user) => sum + (user.data().notePostTest || 0),
          0
        );
        const maxScore = 41;
        setAverageNote(((totalNote * 100) / (maxScore * totalUsers)).toFixed(2));
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
    <div className="min-h-screen bg-gradient-to-b from-[#97b5a5] to-[#4f7f80]">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto text-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold uppercase mb-4 md:mb-0">Classement</h1>
          <Link
            to="/statistics/digramme"
            className="px-4 py-2 rounded-md bg-[#4f7f80]  hover:opacity-90 text-white transition"
          >
            Diagramme Circulaire
          </Link>
        </div>

        <div className="mb-4">
          <p className="text-lg">
            Moyenne générale : <strong>{averageNote}%</strong>
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full text-gray-700">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 text-left">Position</th>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Note</th>
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    index === 0 ? "bg-yellow-100 font-semibold" :
                    index === 1 ? "bg-gray-200" :
                    index === 2 ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.notePostTest} / 39</td>
                  <td className="py-3 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
