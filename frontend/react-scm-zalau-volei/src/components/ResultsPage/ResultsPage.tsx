import React, { useEffect, useState } from "react";
import "./ResultsPage.css";

interface MatchResult {
  id: number;
  stage: string;
  imageUrl: string;
}

interface Standing {
  id: number;
  imageUrl: string;
  description: string;
}

export const ResultsPage = () => {
  const [results, setResults] = useState<MatchResult[]>([]);

  const [standings, setStandings] = useState<Standing[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home/standings")
      .then((res) => res.json())
      .then((data) => setStandings(data))
      .catch((err) => console.error("Error fetching standings:", err));

    fetch("http://localhost:8080/api/home/results")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching results:", err));
  }, []);

  return (
    <div className="results-page-wrapper">
      <div className="results-hero">
        <div className="container">
          <h1 className="display-4 fw-bold">REZULTATE & CLASAMENTE</h1>
          <p className="lead opacity-75">Sezonul 2025-2026</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-40px" }}>
        {standings.length > 0 && (
          <div className="mb-5">
            {standings.map((standing) => (
              <div key={standing.id} className="standings-card mb-5">
                <div className="standings-header">
                  🏆 {standing.description}
                </div>
                <img
                  src={standing.imageUrl}
                  alt={standing.description}
                  className="standings-img"
                />
              </div>
            ))}
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {results.length > 0 ? (
              results.map((result) => (
                <div key={result.id} className="match-result-card">
                  <div className="etapa-label">{result.stage}</div>
                  <img
                    src={result.imageUrl}
                    alt={result.stage}
                    className="result-full-img"
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <h4>Nu există rezultate încărcate.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
