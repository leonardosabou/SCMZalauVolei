import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "../src/components/Navbar.css";
import "../src/components/HomePage/Countdown.css";
import "../src/components/HomePage/News.css";
import "../src/components/HomePage/PlayerCarousel.css";
import "../src/components/HomePage/Results.css";
import "../src/components/HomePage/Sponsors.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { TeamPage } from "./components/TeamPage/TeamPage";
import { ProgramPage } from "./components/ProgramPage/ProgramPage";
import { ResultsPage } from "./components/ResultsPage/ResultsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/echipa" element={<TeamPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/rezultate" element={<ResultsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
