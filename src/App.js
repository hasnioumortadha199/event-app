import "./App.css";
import { Route, Routes } from "react-router-dom";

import ChatApp from "./ChatApp";
import Navbar from "./components/Navbar";
import Home from "./Home";
import GereScreen from "./GereScreen";
import StatScreen from "./StatScreen";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/gere" element={<GereScreen />} />
        <Route path="/stat" element={<StatScreen />} />
      </Routes>
    </div>
  );
}

export default App;
