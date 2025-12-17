import React, { useEffect, useState } from "react";
import "./TeamPage.css";

interface Player {
  id: number;
  name: string;
  shirtNumber: number;
  nationality: string;
  position: string;
  height: string;
  dateOfBirth: string;
  imageUrl: string;
  volleyboxUrl: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export const TeamPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);

  const getFlagImage = (countryCode: string) => {
    const code = countryCode.toUpperCase();
    if (code === "RO") return "/assets/flags/ro.png";
    if (code === "BR") return "/assets/flags/br.png";
    if (code === "CU") return "/assets/flags/cu.png";
    if (code === "EE") return "/assets/flags/ee.png";
    if (code === "ME") return "/assets/flags/me.png";
    if (code === "DE") return "/assets/flags/de.png";
    if (code === "PT") return "/assets/flags/pt.png";
    if (code === "RS") return "/assets/flags/rs.png";
    return null;
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const parts = isoString.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/home/team/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:8080/api/home/team/staff")
      .then((res) => res.json())
      .then((data) => setStaff(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="team-page-wrapper">
      <div className="team-header">
        <h1 className="section-title">LOTUL ECHIPEI 2025-2026</h1>
      </div>

      <div className="container py-5">
        <div className="row g-5 justify-content-center">
          {players.map((player) => (
            <div className="col-lg-4 col-md-6" key={player.id}>
              <div className="player-card-container">
                <div className="player-card-inner">
                  <div className="player-card-front">
                    <span className="player-number">{player.shirtNumber}</span>
                    <img
                      src={player.imageUrl}
                      alt={player.name}
                      className="player-photo"
                    />
                    <div className="player-info-front">
                      <h3 className="fw-bold mb-0 text-uppercase player-name-text">
                        {player.name}
                      </h3>

                      <small className="text-muted fw-bold d-flex align-items-center justify-content-center gap-2">
                        {player.nationality}
                        {getFlagImage(player.nationality) && (
                          <img
                            src={getFlagImage(player.nationality)!}
                            alt={player.nationality}
                            className="flag-icon"
                          />
                        )}
                      </small>
                    </div>
                  </div>

                  <div className="player-card-back">
                    <h3 className="mb-4">{player.name}</h3>
                    <div className="stat-row">
                      <span className="opacity-75">Poziție:</span>{" "}
                      <strong>{player.position}</strong>
                    </div>
                    <div className="stat-row">
                      <span className="opacity-75">Înălțime:</span>{" "}
                      <strong>{player.height}</strong>
                    </div>
                    <div className="stat-row">
                      <span className="opacity-75">Data Nașterii:</span>
                      <strong> {formatDate(player.dateOfBirth)}</strong>
                    </div>
                    {player.volleyboxUrl && (
                      <a
                        href={player.volleyboxUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-volleybox"
                      >
                        Profil Volleybox
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5 pt-5">
          <div className="col-12 text-center mb-5">
            <h2 className="section-title">STAFF TEHNIC</h2>
          </div>
          {staff.map((member) => (
            <div
              className="col-lg-3 col-md-4 col-6 text-center mb-4"
              key={member.id}
            >
              <div className="staff-card p-3 border rounded shadow-sm bg-white">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="img-fluid rounded-circle mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "120px", height: "120px", color: "white" }}
                  >
                    No Foto
                  </div>
                )}
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-muted small text-uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
