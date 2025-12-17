import React, { useEffect, useState } from "react";
import "./ProgramPage.css";
import myLogo from "../../Images/scmzalaulogopng.png";

interface MatchGame {
  id: number;
  opponent: string;
  opponentLogoUrl: string;
  date: string;
  location: string;
  competition: string;
}

export const ProgramPage = () => {
  const [matches, setMatches] = useState<MatchGame[]>([]);

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date
      .toLocaleString("ro-RO", { month: "short" })
      .toUpperCase();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return { day, month, time: `${hours}:${minutes}` };
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/home/program")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error("Error fetching program:", err));
  }, []);

  return (
    <div className="program-page-wrapper">
      <div className="program-hero">
        <div className="container">
          <h1 className="display-4 fw-bold">PROGRAM COMPETIȚIONAL</h1>
          <p className="lead opacity-75">Sezonul 2025-2026</p>
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: "-40px", paddingBottom: "80px" }}
      >
        {matches.length === 0 && (
          <div className="text-center py-5">
            <h3>Nu există meciuri programate momentan.</h3>
          </div>
        )}

        {matches.map((match) => {
          const { day, month, time } = formatMatchDate(match.date);
          const isHome = match.location.toLowerCase().includes("aca");

          return (
            <div
              key={match.id}
              className={`match-strip ${
                isHome ? "border-acasa" : "border-deplasare"
              }`}
            >
              <div className="match-date-box">
                <div className="match-day">{day}</div>
                <div className="match-month">{month}</div>
                <span className="match-time">{time}</span>
              </div>

              <div className="match-teams">
                {isHome ? (
                  <div className="text-center">
                    <img
                      src={myLogo}
                      alt="SCM Zalau"
                      className="team-logo-small"
                    />
                    <div className="fw-bold small mt-1">SCM Zalău</div>
                  </div>
                ) : (
                  <div className="text-center">
                    {match.opponentLogoUrl ? (
                      <img
                        src={match.opponentLogoUrl}
                        alt={match.opponent}
                        className="team-logo-small"
                      />
                    ) : (
                      <div className="team-logo-small d-flex align-items-center justify-content-center bg-light rounded-circle">
                        ?
                      </div>
                    )}
                    <div className="fw-bold small mt-1">{match.opponent}</div>
                  </div>
                )}

                <div className="vs-badge">VS</div>

                {isHome ? (
                  <div className="text-center">
                    {match.opponentLogoUrl ? (
                      <img
                        src={match.opponentLogoUrl}
                        alt={match.opponent}
                        className="team-logo-small"
                      />
                    ) : (
                      <div className="team-logo-small d-flex align-items-center justify-content-center bg-light rounded-circle">
                        ?
                      </div>
                    )}
                    <div className="fw-bold small mt-1">{match.opponent}</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={myLogo}
                      alt="SCM Zalau"
                      className="team-logo-small"
                    />
                    <div className="fw-bold small mt-1">SCM Zalău</div>
                  </div>
                )}
              </div>

              <div className="match-info">
                <span
                  className={`match-location ${
                    isHome ? "text-primary" : "text-danger"
                  }`}
                >
                  {match.location.toUpperCase()}
                </span>
                <div className="match-competition">{match.competition}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
