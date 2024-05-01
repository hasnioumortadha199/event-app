import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase-config";
import Navbar from "./components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AddNotificationScreen() {
  const [notificationText, setNotificationText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [editNotificationId, setEditNotificationId] = useState(null);
  const [editNotificationText, setEditNotificationText] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const fetchedNotifications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };

    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const updatedNotifications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(updatedNotifications);
    });

    return () => unsubscribe();
  }, []);

  const handleAddNotification = async () => {
    try {
      await addDoc(collection(db, "notifications"), {
        text: notificationText,
        timeStamp: serverTimestamp(), // Use Firestore Timestamp for the current time
      });
      console.log("Notification added");
      setNotificationText("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id));
      console.log("Notification deleted with ID: ", id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEditNotification = async (id) => {
    try {
      await updateDoc(doc(db, "notifications", id), {
        text: editNotificationText,
      });
      console.log("Notification edited with ID: ", id);
      setEditNotificationId(null); // Close the edit mode
    } catch (error) {
      console.error("Error editing document: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Add Notification</h1>
        <textarea
          value={notificationText}
          onChange={(e) => setNotificationText(e.target.value)}
          className="w-full h-40 border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Enter notification text..."
        ></textarea>
        <button
          onClick={handleAddNotification}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Notification
        </button>

        <h2 className="text-3xl font-semibold mt-8 mb-4">Notifications</h2>
        <ul className="divide-y divide-gray-300">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex justify-between items-center py-2">
              {editNotificationId === notification.id ? (
                <input
                  type="text"
                  value={editNotificationText}
                  onChange={(e) => setEditNotificationText(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                />
              ) : (
                <p className="flex-grow">{notification.text}</p>
              )}
              <div>
                {editNotificationId === notification.id ? (
                  <button onClick={() => handleEditNotification(notification.id)} className="mr-2 text-blue-500">
                    Save
                  </button>
                ) : (
                  <button onClick={() => {
                    setEditNotificationId(notification.id);
                    setEditNotificationText(notification.text); // Set the initial value of editNotificationText
                  }} className="mr-2 text-blue-500">
                    <FaEdit />
                  </button>
                )}
                <button onClick={() => handleDeleteNotification(notification.id)} className="text-red-500">
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
