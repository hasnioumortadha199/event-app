import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase-config";
import Navbar from "./components/Navbar";
import Chart from "chart.js/auto";
import NavbarT from "./components/NavbarTwo";

export default function DigrammeScreen() {
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalFalse, setTotalFalse] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [correctPercentage, setCorrectPercentage] = useState(0);
  const [falsePercentage, setFalsePercentage] = useState(0);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "users")));
        const usersData = querySnapshot.docs.map((doc) => doc.data());


        
        let correctCount = 0;
        let falseCount = 0;

        usersData.forEach((user) => {
          user.postNoteQues.forEach((question) => {
            if (question.note === 1) {
              correctCount++;
            } else {
              falseCount++;
            }
          });
        });

        const total = correctCount + falseCount;

        setTotalCorrect(correctCount);
        setTotalFalse(falseCount);
        setTotalAnswers(total);

        const correctPercentage = (correctCount / total) * 100;
        const falsePercentage = (falseCount / total) * 100;

        setCorrectPercentage(correctPercentage.toFixed(2));
        setFalsePercentage(falsePercentage.toFixed(2));

        createChart(correctCount, falseCount);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersData();
  }, []);

  const createChart = (correct, falseAnswers) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Correct", "False"],
        datasets: [
          {
            label: "Percentage of Correct and False Answers",
            data: [correct, falseAnswers],
            backgroundColor: ["green", "red"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  return (
    <div>
      <NavbarT />
      <div className="p-6">
        <h1 className="m-5 text-6xl font-bold mb-4   text-center">Diagramme circulaire</h1>
        
      </div>
      <div className="container mx-auto px-4 overflow-x-auto">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
      <div className="mt-5 text-center">
          <p className="text-2xl">Total Correct: {totalCorrect} ({correctPercentage}%)</p>
          <p className="text-2xl"> Total False: {totalFalse} ({falsePercentage}%)</p>
        </div>
    </div>
  );
}
