import rezEt1 from "../../Images/ResultsImages/RezultatEtapaI.png";
import rezEt2 from "../../Images/ResultsImages/RezultatEtapaII.png";
import "./Results.css";
export const Results = () => {
  return (
    <>
      <div className="top-bar"></div>
      <section className="results-section container-fluid py-5">
        <div className="mb-5">
          <div className="col-12 text-start ps-lg-5">
            <h1 className="news-title">ULTIMELE REZULTATE</h1>
          </div>
        </div>
        <div className="results-grid">
          <div className="results-column">
            <h2 className="results-etapa">Etapa I</h2>
            <img src={rezEt1} alt="rezEt1" className="results-img" />
          </div>
          <div className="results-column">
            <h2 className="results-etapa">Etapa II</h2>
            <img src={rezEt2} alt="rezEt2" className="results-img" />
          </div>
        </div>
        {/* Desktop button */}
        <div className="d-none d-md-block text-end mt-5">
          <a className="btn btn-outline-light btn-lg" href="#">
            Vezi Mai Multe Rezultate
          </a>
        </div>

        {/* Mobile button */}
        <div className="d-block d-md-none mt-4 text-center">
          <a className="btn btn-outline-light btn-lg w-100" href="#">
            Vezi Mai Multe Rezultate
          </a>
        </div>
      </section>
    </>
  );
};
