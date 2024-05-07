// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import StatCycleScreen from "./StatCyrcle";
import StatScreen from "./StatCyrcle";

export default function Home() {
  const navigate = useNavigate();

  const goToManagement = () => {
    navigate("/management");
  };

  const goToChat = () => {
    navigate("/chat");
  };

  const goToStatistics = () => {
    navigate("/statistics");
  };

  const goToReview = () => {
    navigate("/review");
  };
  const goToNotification = () => {
    navigate("/notification");
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-semibold text-center mb-8">
        Bienvenue sur votre application
        </h1>
       

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
            title="Gestion"
            description="Section de Pretest et post test ."
            onClick={goToManagement}
          />
          <Card
            title="Chat"
            description="Section de discussion et répondez aux messages."
            onClick={goToChat}
          />
          <Card
            title="Statistics"
            description="Section statistiques. "
            onClick={goToStatistics}
          />
          <Card
            title="Review"
            description="Section de révision et fournissez vos commentaires."
            onClick={goToReview}
          />
             <Card
            title="Notification"
            description="Section  de  révision  et fournissez vos Notification (ajout supprimé édit)."
            onClick={goToNotification}
          />
        </div>
        
      </div>
    </div>
  );
}

function Card({ title, description, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="p-3 bg-gray-100 flex justify-end">
        <button
          onClick={onClick}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Aller
        </button>
      </div>
    </div>
  );
}
