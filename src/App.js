import "./App.css";
import { Route, Routes } from "react-router-dom";

import ChatApp from "./ChatApp";
import Navbar from "./components/Navbar";
import Home from "./Home";
import GereScreen from "./GereScreen";
import StatScreen from "./StatScreen";
import ReviewPage from "./Review_page";
import ReviewDayPage from "./days_page";
import ReviewDayProf from "./review_prof";
import DigrammeScreen from "./Diagramme";
import NotificationPage from "./Notification";
 

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/management" element={<GereScreen />} />
        <Route path="/statistics" element={<StatScreen />} />
         
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/reviewprof/:day" element={< ReviewDayProf />} />
        <Route path="/review/:day" element={<ReviewDayPage />} />
        
        <Route path="/statistics/digramme" element={<DigrammeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
