import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase-config";
import Navbar from "./components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AddNotificationScreen() {
  const [notificationText, setNotificationText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [editNotificationId, setEditNotificationId] = useState(null);
  const [editNotificationText, setEditNotificationText] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const updated = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleAddNotification = async () => {
    if (notificationText.trim() === "") return;
    try {
      await addDoc(collection(db, "notifications"), {
        text: notificationText,
        timeStamp: serverTimestamp(),
      });
      setNotificationText("");
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleEditNotification = async (id) => {
    if (editNotificationText.trim() === "") return;
    try {
      await updateDoc(doc(db, "notifications", id), {
        text: editNotificationText,
      });
      setEditNotificationId(null);
      setEditNotificationText("");
    } catch (error) {
      console.error("Error editing notification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#97b5a5] to-[#4f7f80] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Ajouter une Notification</h1>

        <textarea
          value={notificationText}
          onChange={(e) => setNotificationText(e.target.value)}
          className="w-full h-32 rounded-md p-3 text-black mb-4 border focus:ring-2 focus:ring-[#4f7f80]"
          placeholder="Tapez votre notification ici..."
        ></textarea>

        <button
          onClick={handleAddNotification}
          className="mb-6 px-6 py-2 rounded-md bg-[#4f7f80]  hover:opacity-90 transition-all"
        >
          Ajouter Notification
        </button>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Liste des Notifications</h2>
        <ul className="space-y-3">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="bg-white text-gray-800 rounded-md p-4 flex justify-between items-center shadow-md"
            >
              {editNotificationId === notification.id ? (
                <input
                  autoFocus
                  value={editNotificationText}
                  onChange={(e) => setEditNotificationText(e.target.value)}
                  className="flex-grow border rounded-md p-2 mr-4"
                />
              ) : (
                <p className="flex-grow">{notification.text}</p>
              )}
              <div className="flex space-x-3">
                {editNotificationId === notification.id ? (
                  <button
                    onClick={() => handleEditNotification(notification.id)}
                    className="text-[#4f7f80] font-semibold"
                  >
                    Sauvegarder
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditNotificationId(notification.id);
                      setEditNotificationText(notification.text);
                    }}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
