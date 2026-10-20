import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-ignore CSS files are handled by the bundler and have no TypeScript declarations.
import "./App.css";
// @ts-ignore CSS files are handled by the bundler and have no TypeScript declarations.
import "../src/components/Navbar.css";
// @ts-ignore CSS files are handled by the bundler and have no TypeScript declarations.
import "../src/components/HomePage/Countdown.css";
// @ts-ignore CSS files are handled by the bundler and have no TypeScript declarations.
import "../src/components/HomePage/News.css";
// @ts-ignore CSS files are handled by the bundler and have no TypeScript declarations.
import "../src/components/HomePage/PlayerCarousel.css";
// @ts-ignore CSS files are handled by the bundler and have no TypeScript declarations.
import "../src/components/HomePage/Results.css";
// @ts-ignore CSS files are handled by the bundler and have no TypeScript declarations.
import "../src/components/HomePage/Sponsors.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { TeamPage } from "./components/TeamPage/TeamPage";
import { ProgramPage } from "./components/ProgramPage/ProgramPage";
import { ResultsPage } from "./components/ResultsPage/ResultsPage";
import { NewsPage } from "./components/NewsPage/NewsPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { GalleryPage } from "./components/GalleryPage/GalleryPage";
import { ContactPage } from "./components/ContactPage/ContactPage";
import { AdminPage } from "./components/AdminPage/AdminPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/echipa" element={<TeamPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/rezultate" element={<ResultsPage />} />
          <Route path="/stiri" element={<NewsPage />} />
          <Route path="/galerie" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
