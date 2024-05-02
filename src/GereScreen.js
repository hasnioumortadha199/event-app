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
    <div className=" bg-slate-100">
      <div className=" m-5 h-[30rem]  h-full card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body ">
          <div className="card-actions justify-end"></div>
          {globalData.isPreTest && isColor ? <ColorIndex /> : <IndexValue />}
        </div>
      </div>
      <div className="flex h-1/4">
        <div className="w-2/5 card bg-base-100 shadow-xl m-5 p-3">
          <div className="  card-body">
            <h1 className="text-8xl text-center font-bold">
              {" "}
              {remainingSeconds}{" "}
            </h1>

            <div className="card-actions absolute bottom-8 right-8 m-2 ">
              <button
                onClick={handleRestart}
                className="px-4 py-2 bg-red-500 text-white rounded-md border border-red-500 hover:bg-red-600 focus:outline-none focus:bg-red-600"

                
              >
                Démarer
              </button>
            </div>
          </div>
        </div>{" "}
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
                className="absolute bottom-2 right-50 m-5 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"

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
