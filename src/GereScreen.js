import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import { IndexValue } from "./components/indexValue";
import Globale from "./components/Globale";
import StatComp from "./components/StatComp";

export default function GereScreen() {
  const [initialSeconds, setInitialSeconds] = useState(5);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current);
  }, [remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      clearInterval(intervalIdRef.current);
    }
  }, [remainingSeconds]);

  const handleRestart = () => {
    setRemainingSeconds(initialSeconds);
  };
  return (
    <div>
      <div className="flex justify-center">
        <div className="text-center text-5xl font-bold"></div>
        <div className="flex">
          <div className="m-5 card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body ">
              <div className="card-actions justify-end"></div>

              <IndexValue />
              <Globale />
            </div>
          </div>
          <div className="  m-5 card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body ">
              <div className="card-actions justify-end"></div>
              <StatComp />
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="flex">
        <div className="w-1/2 card  bg-base-100 shadow-xl m-3 p-3">
          <div className="card-body">
            <h1 className="text-9xl 0card-title text-center text-5xl font-bold">
              {" "}
              {remainingSeconds}{" "}
            </h1>

            <div className="card-actions justify-end">
              <button onClick={handleRestart} className="btn btn-primary">
                Démarer
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
