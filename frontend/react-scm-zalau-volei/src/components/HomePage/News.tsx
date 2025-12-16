import stire1 from "../../Images/NewsImages/stire1.png";
import stire2 from "../../Images/NewsImages/stire2.png";
import "./News.css";

export const News = () => {
  return (
    <section className="news-section container-fluid py-5">
      <div className="container-fluid custom-news-container">
        <div className="row mb-5">
          <div className="col-12 text-center text-md-start">
            <h2 className="section-title">ȘTIRI RECENTE</h2>
          </div>
        </div>

        <div className="news-grid">
          <a
            href="https://www.sportulsalajean.ro/lovitura-de-final-de-mercato-pentru-scm-zalau-un-international-din-estonia-vine-sa-aduca-forta-in-extrema-a-278067"
            target="_blank"
            rel="noopener noreferrer"
            className="modern-card"
          >
            <div className="card-image-wrapper">
              <img src={stire1} alt="Stire SCM Zalau 1" className="news-img" />
            </div>
          </a>

          <a
            href="https://www.sportulsalajean.ro/divizia-a1-la-volei-masculin-incepe-in-weekend-cum-arata-programul-lui-scm-zalau-in-tur-a-277913"
            target="_blank"
            rel="noopener noreferrer"
            className="modern-card"
          >
            <div className="card-image-wrapper">
              <img src={stire2} alt="Stire SCM Zalau 2" className="news-img" />
            </div>
          </a>
        </div>

        <div className="text-center mt-5">
          <a
            className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold"
            href="#"
          >
            Vezi Toate Știrile
          </a>
        </div>
      </div>
    </section>
  );
};
