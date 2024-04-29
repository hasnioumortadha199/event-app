import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FaComment , FaComments  } from 'react-icons/fa';
export default function ReviewPage() {
  const navigate = useNavigate();

  const goToReview = (day) => {
    navigate(`/review/${day}`);
  };

  const goToTeacherComment = (day) => {
    navigate(`/reviewprof/${day}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold text-center mb-8">
         Commentaires pour chaque jour
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
          {Array.from({ length: 5 }, (_, i) => (
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
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2">Jour {day}</h2>
       < p className="text-sm text-gray-500 mb-2"> Voir les commentaire</p> 
      </div>
      <div className="p-2 flex flex-col">
        <button
          onClick={onClickReview}
          className="flex items-center justify-center px-4 py-2 bg-red-100 text-black rounded-md hover:bg-red-600 focus:outline-none focus:bg-blue-600 mb-2"
        >
          
          <span>Pour le programme </span> {/* Text */}
      <span className="ml-2"> {/* Space */}
      <FaComment />{/* Teacher icon */}
      </span>
         
        </button>
        <button
          onClick={onClickTeacherComment}
          className="flex items-center justify-center px-4 py-2 bg-red-300 text-black rounded-md hover:bg-red-600  focus:outline-none focus:bg-red-600"
        >
           
           <span>Pour le professeur </span> {/* Text */}
      <span className="ml-2"> {/* Space */}
      <FaComments /> {/* Teacher icon */}
      </span>
        </button>
      </div>
    </div>
  );
}
