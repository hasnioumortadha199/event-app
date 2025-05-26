import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import { IndexValue } from "./components/indexValue";
import StatComp from "./components/StatComp";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { ColorIndex } from "./components/ColorIndex";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import StatScreen from "./StatCyrcle";
import StatCycleScreen from "./StatCyrcle";
export default function GereScreen() {
  const [initialSeconds, setInitialSeconds] = useState(15);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const intervalIdRef = useRef(null);
  const [globalData, setGlobalData] = useState(0);
  const [isColor, setIsColor] = useState(false);
  const navigate = useNavigate();
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
  const handleChangetwo = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, { isPreTest: true });
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        setGlobalData(updatedDocSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error incrementing index:", error);
    }
  };
  const handleChangetime = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, { time: false });
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        setGlobalData(updatedDocSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error incrementing index:", error);
    }
  };
  const handleChangetimeoN = async () => {
    try {
      const docRef = doc(db, "globalData", "admin-control");
      await updateDoc(docRef, { time: true });
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        setGlobalData(updatedDocSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error incrementing index:", error);
    }
  };
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      clearInterval(intervalIdRef.current);
      setIsColor(true);
      handleChangetwo();
      handleChangetime();
    }
  }, [remainingSeconds]);

  const handleRestart = () => {
    setRemainingSeconds(initialSeconds);
    setIsColor(false);
    handleChangetimeoN();
  };

  const handleClass = () => {
    navigate("/statistics");
  };
  return ( <div>
    <div className="">
       <div className=" m-5 h-[30rem]  h-full card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body ">
          <div className="card-actions justify-end"></div>
          {globalData.isPreTest && isColor ? <ColorIndex /> : <IndexValue />}
        </div>
      </div>
      <div className="flex h-1/4">
       <div className="w-full md:w-2/5 bg-white rounded-xl shadow-xl m-5 p-6 relative">
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-8xl font-bold text-gray-800 mb-6">
      {remainingSeconds}
    </h1>

    <button
      onClick={handleRestart}
      className="px-6 py-3 text-white rounded-md bg-gradient-to-r from-[#97b5a5] via-[#4f7f80] to-[#4f7f80] hover:opacity-90 focus:outline-none transition-all duration-300 absolute bottom-6 right-6"
    >
      Démarrer
    </button>
  </div>
</div>

        <div className="w-1/5  m-5 card lg:card-side bg-base-100 shadow-xl">
          <div className="card-body ">
            <div className="card-actions place-content-center">
              <img
                class="h-30 max-w-full"
                src="./flash.png"
                alt="image description"
              />
              <button
                onClick={handleClass}
  className="absolute bottom-2 right-50 m-5 px-4 py-2 text-white rounded-md bg-gradient-to-r from-[#97b5a5] via-[#4f7f80] to-[#4f7f80] hover:opacity-90 focus:outline-none"

              >
                Classement
              </button>
            </div>
          </div>
        </div>{" "}
        <div className="w-2/5 h-[20rem] m-2 card lg:card-side bg-base-100 shadow-xl">
          <div className="card-body ">
            <div className="card-actions justify-center">
              {" "}
              {globalData.isPreTest && <StatComp />}
            </div>
          </div>
        </div>
      </div>{" "}
    </div></div>
  );
}
