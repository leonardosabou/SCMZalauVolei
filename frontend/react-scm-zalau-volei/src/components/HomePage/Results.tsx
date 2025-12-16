import rezEt1 from "../../Images/ResultsImages/RezultatEtapaI.png";
import rezEt2 from "../../Images/ResultsImages/RezultatEtapaII.png";
import "./Results.css";

export const Results = () => {
  return (
    <section className="results-section container-fluid py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center text-md-start">
            <h2 className="section-title">ULTIMELE REZULTATE</h2>
          </div>
        </div>

        <div className="row g-5 justify-content-center">
          <div className="col-lg-6">
            <div className="result-card">
              <div className="card-header-custom">
                <span className="etapa-badge">Etapa I</span>
              </div>
              <img src={rezEt1} alt="Rezultat Etapa I" className="result-img" />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="result-card">
              <div className="card-header-custom">
                <span className="etapa-badge">Etapa II</span>
              </div>
              <img
                src={rezEt2}
                alt="Rezultat Etapa II"
                className="result-img"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <a
            className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold"
            href="#"
          >
            Vezi Toate Rezultatele
          </a>
        </div>
      </div>
    </section>
  );
};
