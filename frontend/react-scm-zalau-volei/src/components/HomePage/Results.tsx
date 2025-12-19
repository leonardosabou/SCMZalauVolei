import { useEffect, useState } from "react";
import "./Results.css";

interface MatchResult {
  id: number;
  stage: string;
  imageUrl: string;
}

export const Results = () => {
  const [results, setResults] = useState<MatchResult[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home/results")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error("Error fetching results:", err));
  }, []);

  return (
    <section className="results-section container-fluid py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center text-md-start">
            <h2 className="section-title">ULTIMELE REZULTATE</h2>
          </div>
        </div>

        <div className="row g-5 justify-content-center">
          {results.slice(0, 2).map((result) => (
            <div className="col-lg-6" key={result.id}>
              <div className="result-card">
                <div className="card-header-custom">
                  <span className="etapa-badge">{result.stage}</span>
                </div>
                <img
                  src={result.imageUrl}
                  alt={`Rezultat ${result.stage}`}
                  className="result-img"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a
            className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold"
            href="/rezultate"
          >
            Vezi Toate Rezultatele
          </a>
        </div>
      </div>
    </section>
  );
};