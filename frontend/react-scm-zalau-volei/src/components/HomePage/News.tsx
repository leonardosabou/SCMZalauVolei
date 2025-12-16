import stire1 from "../../Images/NewsImages/stire1.png";
import stire2 from "../../Images/NewsImages/stire2.png";
import stiri_poza1 from "../../Images/NewsImages/stiri_poza1.jpg";
import stiri_poza2 from "../../Images/NewsImages/stiri_poza2.jpg";
import "./News.css";

export const News = () => {
  return (
    <>
      <div className="top-bar"></div>
      <section className="news-section container-fluid py-5">
        {/* Title */}
        <div className="row mb-4">
          <div className="col-12 text-start ps-lg-5">
            <h1 className="news-title">ȘTIRI</h1>
          </div>
        </div>

        {/* Grid layout */}
        <div className="news-grid">
          {/* Image 1 - clickable */}
          <a
            href="https://www.sportulsalajean.ro/lovitura-de-final-de-mercato-pentru-scm-zalau-un-international-din-estonia-vine-sa-aduca-forta-in-extrema-a-278067"
            target="_blank"
            rel="noopener noreferrer"
            className="news-item-link"
          >
            <img src={stire1} alt="stire1" className="news-img" />
          </a>

          {/* Image 4 - clickable */}
          <a
            href="https://www.sportulsalajean.ro/divizia-a1-la-volei-masculin-incepe-in-weekend-cum-arata-programul-lui-scm-zalau-in-tur-a-277913"
            target="_blank"
            rel="noopener noreferrer"
            className="news-item-link"
          >
            <img src={stire2} alt="stire2" className="news-img" />
          </a>
        </div>
        {/* Desktop button */}
        <div className="d-none d-md-block text-end mt-4">
          <a className="btn btn-outline-light btn-lg" href="#">
            Vezi Mai Multe Știri
          </a>
        </div>

        {/* Mobile button */}
        <div className="d-block d-md-none mt-4 text-center">
          <a className="btn btn-outline-light btn-lg w-100" href="#">
            Vezi Mai Multe Știri
          </a>
        </div>
      </section>
    </>
  );
};
