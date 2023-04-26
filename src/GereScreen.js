import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import { IndexValue } from "./components/indexValue";
import Globale from "./components/Globale";
import StatComp from "./components/StatComp";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { ColorIndex } from "./components/ColorIndex";
import { useNavigate } from "react-router-dom";

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
    navigate("/stat");
  };
  return (
    <div className=" bg-slate-100">
      <div className="flex ">
        <div className="w-2/3 h-96 m-5 card lg:card-side bg-base-100 shadow-xl">
          <div className="card-body ">
            <div className="card-actions justify-end"></div>
            {globalData.isPreTest && isColor ? <ColorIndex /> : <IndexValue />}
          </div>
        </div>
        <div className="w-1/3 h-96 card bg-base-100 shadow-xl m-5 p-3">
          <div className="  card-body">
            <h1 className="text-8xl text-center font-bold">
              {" "}
              {remainingSeconds}{" "}
            </h1>

            <div className="card-actions absolute bottom-8 right-8 m-5 ">
              <button
                onClick={handleRestart}
                className="btn btn-outline btn-info"
              >
                Démarer
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="flex">
        <div className="w-1/3 h-96 m-5 card lg:card-side bg-base-100 shadow-xl">
          <div className="card-body ">
            <div className="card-actions justify-center">
              {" "}
              {globalData.isPreTest && <StatComp />}
            </div>
            <button
              onClick={handleClass}
              className="absolute bottom-8 right-8 m-5 btn btn-outline btn-info "
            >
              Classement
            </button>
          </div>
        </div>
        <div className="w-2/3 h-96 m-5 card lg:card-side bg-base-100 shadow-xl">
          <div className="card-body ">
            <div className="card-actions place-content-center">
              <img
                class="h-60 max-w-full"
                src="./Flash.png"
                alt="image description"
              />
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}
