import React, { useEffect, useState } from "react";
import "./Countdown.css";
import myLogo from "../../Images/scmzalaulogopng.png";

interface MatchGame {
  id: number;
  opponent: string;
  opponentLogoUrl: string;
  date: string;
  location: string;
  competition: string;
}

export const Countdown = () => {
  const [match, setMatch] = useState<MatchGame | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("Se încarcă...");

  useEffect(() => {
    fetch("http://localhost:8080/api/home/next-match")
      .then((res) => {
        if (res.status === 204) return null;
        return res.json();
      })
      .then((data) => setMatch(data))
      .catch((err) => console.error("Error fetching match:", err));
  }, []);

  useEffect(() => {
    if (!match) {
      setTimeLeft("Nu există meciuri programate");
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const matchTime = new Date(match.date).getTime();
      const distance = matchTime - now;

      if (distance < 0) {
        setTimeLeft("MECIUL A ÎNCEPUT!");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const parts = [];
        if (days > 0) parts.push(`${days}z`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0 || (days === 0 && hours === 0))
          parts.push(`${minutes}m`);
        parts.push(`${seconds}s`);

        setTimeLeft(parts.join(" "));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [match]);

  return (
    <div className="countdown-hero container-fluid">
      <div className="container position-relative z-index-2 py-5 text-center">
        <h1 className="hero-title mb-4">URMĂTORUL MECI</h1>

        <div className="countdown-box">
          <h3
            className="next-match-label mb-2"
            style={{ color: "#ffcc00", fontWeight: "bold" }}
          >
            {match?.location ? match.location.toUpperCase() : "STATUS"}
          </h3>

          <h1 className="display-4 fw-bold mb-4 text-white">{timeLeft}</h1>

          {match && (
            <div className="d-flex justify-content-center align-items-center gap-4 mt-4 mb-4">
              <img src={myLogo} alt="SCM Zalau" className="team-logo" />
              <span className="fw-bold text-white h3 m-0">VS</span>
              {match.opponentLogoUrl ? (
                <img
                  src={match.opponentLogoUrl}
                  alt={match.opponent}
                  className="team-logo"
                />
              ) : (
                <div className="text-white fw-bold">{match.opponent}</div>
              )}
            </div>
          )}

          <div className="mt-4">
            <h4 className="text-white mb-3">{match?.competition || ""}</h4>
            <a type="button" className="btn btn-custom btn-lg px-5" href="#">
              Vezi Programul
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
