import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const goToManagement = () => navigate("/management");
  const goToChat = () => navigate("/chat");
  const goToStatistics = () => navigate("/statistics");
  const goToReview = () => navigate("/review");
  const goToNotification = () => navigate("/notification");
  const goToCodeQr = () => navigate("/codeqr");
  

  return (
    <div className="bg-gradient-to-b from-[#97b5a5] to-[#4f7f80] min-h-screen">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-md">
          Bienvenue sur votre application
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Gestion"
            description="Section de Pretest et Post-test."
            onClick={goToManagement}
          />
          <Card
            title="Chat"
            description="Discutez et répondez aux messages."
            onClick={goToChat}
          />
          <Card
            title="Statistiques"
            description="Consultez vos données et performances."
            onClick={goToStatistics}
          />
          <Card
            title="Révision"
            description="Revenez sur les tests et donnez votre avis."
            onClick={goToReview}
          />
          <Card
            title="Notification"
            description="Ajoutez, éditez ou supprimez les notifications."
            onClick={goToNotification}
          />
             <Card
            title="CODE QR"
            description="Ajoutez, un CODE QR."
            onClick={goToCodeQr}
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, description, onClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="p-4 bg-gray-50 flex justify-end rounded-b-2xl">
        <button
          onClick={onClick}
          className="px-4 py-2 rounded-md text-white text-sm bg-gradient-to-r from-[#97b5a5] via-[#4f7f80] to-[#4f7f80] hover:opacity-90 transition-all duration-300"
        >
          Aller
        </button>
      </div>
    </div>
  );
}
