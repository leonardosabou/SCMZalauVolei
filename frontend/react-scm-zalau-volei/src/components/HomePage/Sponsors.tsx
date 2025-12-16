import React, { useRef, useEffect, useState } from "react";
import autodan from "../../Images/SponsorsImages/autodan.png";
import avril from "../../Images/SponsorsImages/avril.png";
import brilliant from "../../Images/SponsorsImages/brilliant.jpg";
import citygroup from "../../Images/SponsorsImages/citygroup.png";
import rematinvest from "../../Images/SponsorsImages/rematinvest.png";
import silcar from "../../Images/SponsorsImages/silcar.png";
import totalas from "../../Images/SponsorsImages/totalas.png";
import welthaus from "../../Images/SponsorsImages/welthaus.png";
import "./Sponsors.css";

export const Sponsors = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<string[][]>([]);

  const sponsors = [
    autodan,
    avril,
    brilliant,
    citygroup,
    welthaus,
    rematinvest,
    silcar,
    totalas,
  ];

  const updateSlides = () => {
    const width = window.innerWidth;
    const chunkSize = width < 768 ? 2 : 4;
    const newSlides: string[][] = [];
    for (let i = 0; i < sponsors.length; i += chunkSize) {
      newSlides.push(sponsors.slice(i, i + chunkSize));
    }
    setSlides(newSlides);
  };

  useEffect(() => {
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <section className="sponsor-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">PARTENERII NOȘTRI</h2>
          <p className="text-muted mt-2">Susținem performanța împreună</p>
        </div>

        <div
          id="carouselSponsors"
          className="carousel slide"
          data-bs-ride="carousel"
          ref={carouselRef}
        >
          <div className="carousel-inner">
            {slides.map((group, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="row justify-content-center align-items-center">
                  {group.map((src, idx) => (
                    <div
                      key={idx}
                      className="col-6 col-md-3 d-flex justify-content-center p-2 p-md-4"
                    >
                      <img
                        src={src}
                        alt="Sponsor"
                        className="sponsor-img img-fluid"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselSponsors"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselSponsors"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>

        <div className="text-center mt-5">
          <a href="#" className="btn btn-outline-secondary rounded-pill btn-sm">
            Vezi toți sponsorii
          </a>
        </div>
      </div>
    </section>
  );
};
