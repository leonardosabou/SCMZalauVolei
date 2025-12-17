import React, { useRef, useEffect, useState } from "react";
import "./Sponsors.css";

interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
}

export const Sponsors = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [slides, setSlides] = useState<Sponsor[][]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home/sponsors")
      .then((res) => res.json())
      .then((data) => setSponsors(data))
      .catch((err) => console.error("Error fetching sponsors:", err));
  }, []);

  const updateSlides = () => {
    if (sponsors.length === 0) return;

    const width = window.innerWidth;
    const chunkSize = width < 992 ? 2 : 4; 
    const newSlides: Sponsor[][] = [];
    
    for (let i = 0; i < sponsors.length; i += chunkSize) {
      newSlides.push(sponsors.slice(i, i + chunkSize));
    }
    setSlides(newSlides);
  };

  useEffect(() => {
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [sponsors]);

  return (
    <section className="sponsor-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">PARTENERII NOȘTRI</h2>
          <p className="text-muted mt-2">Susținem performanța împreună</p>
        </div>

        <div id="carouselSponsors" className="carousel slide" data-bs-ride="carousel" ref={carouselRef}>
          <div className="carousel-inner">
            {slides.map((group, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                <div className="row justify-content-center align-items-center">
                  {group.map((sponsor) => (
                    <div key={sponsor.id} className="col-6 col-md-3 d-flex justify-content-center p-2 p-md-4">
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className="sponsor-img img-fluid"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselSponsors" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselSponsors" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>
  );
};