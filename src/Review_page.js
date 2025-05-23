import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FaComment, FaComments } from "react-icons/fa";

export default function ReviewPage() {
  const navigate = useNavigate();

  const goToReview = (day) => {
    navigate(`/review/${day}`);
  };

  const goToTeacherComment = (day) => {
    navigate(`/reviewprof/${day}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#97b5a5] to-[#4f7f80] min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Commentaires pour chaque jour
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 7 }, (_, i) => (
            <Card
              key={i}
              day={i + 1}
              onClickReview={() => goToReview(i + 1)}
              onClickTeacherComment={() => goToTeacherComment(i + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ day, onClickReview, onClickTeacherComment }) {
  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow p-6">
      <h2 className="text-xl font-semibold mb-2">Jour {day}</h2>
      <p className="text-sm text-gray-500 mb-4">Commentaires disponibles :</p>

      <div className="space-y-3">
        <button
          onClick={onClickReview}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#97b5a5] via-[#4f7f80] to-[#4f7f80] text-white rounded-md hover:opacity-90 transition-all"
        >
          <FaComment />
          <span>Pour le programme</span>
        </button>

        <button
          onClick={onClickTeacherComment}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4f7f80] via-[#2c4d4d] to-[#2c4d4d] text-white rounded-md hover:opacity-90 transition-all"
        >
          <FaComments />
          <span>Pour le professeur</span>
        </button>
      </div>
    </div>
  );
}
