import React from "react";
import "./Countdown.css";

export const Countdown = () => {
  return (
    <div className="countdown-hero container-fluid">
      <div className="container position-relative z-index-2 py-5 text-center">
        <h1 className="hero-title mb-4">SCM ZALĂU VOLEI</h1>
        
        <div className="countdown-box">
          <h3 className="next-match-label mb-3">URMĂTORUL MECI ÎN:</h3>
          <h1 className="display-4 fw-bold mb-4 text-white">1z 18h 30m 25s</h1>
          
          <div className="mt-4">
            <a type="button" className="btn btn-custom btn-lg px-5" href="#">
              Vezi Programul
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};