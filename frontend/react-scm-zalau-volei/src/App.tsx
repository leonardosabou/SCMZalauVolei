import React from "react";
import { Navbar } from "./components/Navbar";
import "./App.css";
import "../src/components/Navbar.css";
import "../src/components/HomePage/Countdown.css";
import "../src/components/HomePage/News.css";
import "../src/components/HomePage/PlayerCarousel.css";
import "../src/components/HomePage/Results.css";
import "../src/components/HomePage/Sponsors.css";
import { Countdown } from "./components/HomePage/Countdown";
import { PlayerCarousel } from "./components/HomePage/PlayerCarousel";
import { News } from "./components/HomePage/News";
import {Results} from "./components/HomePage/Results";
import { Sponsors } from "./components/HomePage/Sponsors";

function App() {
  return (
    <div>
      <Navbar />
      <Countdown />
      <PlayerCarousel />
      <News />
      <Results />
      <Sponsors />
    </div>
  );
}

export default App;
