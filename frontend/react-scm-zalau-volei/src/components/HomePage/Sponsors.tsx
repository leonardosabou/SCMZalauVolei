import React, { useRef, useEffect, useState } from "react";

import autodan from "../../Images/SponsorsImages/autodan.png";
import avril from "../../Images/SponsorsImages/avril.png";
import brilliant from "../../Images/SponsorsImages/brilliant.jpg";
import citygroup from "../../Images/SponsorsImages/citygroup.png";
import rematinvest from "../../Images/SponsorsImages/rematinvest.png";
import silcar from "../../Images/SponsorsImages/silcar.png";
import totalas from "../../Images/SponsorsImages/totalas.png";
import welthaus from "../../Images/SponsorsImages/welthaus.png";

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

  // Create slides dynamically based on window width
  const updateSlides = () => {
    const width = window.innerWidth;
    const chunkSize = width < 768 ? 1 : 4; // 1 per slide on mobile, 4 per slide on desktop
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

  // Swipe support
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const deltaX = startX - endX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          carousel
            .querySelector<HTMLButtonElement>(".carousel-control-next")
            ?.click();
        } else {
          carousel
            .querySelector<HTMLButtonElement>(".carousel-control-prev")
            ?.click();
        }
      }
    };

    carousel.addEventListener("touchstart", handleTouchStart);
    carousel.addEventListener("touchmove", handleTouchMove);
    carousel.addEventListener("touchend", handleTouchEnd);

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart);
      carousel.removeEventListener("touchmove", handleTouchMove);
      carousel.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <>
      <div className="top-bar"></div>
      <section className="sponsor-section container-fluid py-5">
        <div className="mb-3">
          <div className="col-12 text-start ps-lg-5">
            <h1 className="sponsor-title">SPONSORI</h1>
          </div>
        </div>

        <div className="sponsor-carousel-wrapper">
          <div
            className="container carousel-container"
            style={{ position: "relative" }}
          >
            <div
              id="carouselSponsors"
              className="carousel carousel-light slide mt-3"
              data-bs-interval="false"
              ref={carouselRef}
            >
              <div className="carousel-inner px-5">
                {slides.map((group, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <div className="row d-flex justify-content-center align-items-center">
                      {group.map((src, idx) => (
                        <div
                          key={idx}
                          className="col-12 col-md-3 d-flex justify-content-center my-3"
                        >
                          <img
                            src={src}
                            alt={`Sponsor ${index * group.length + idx + 1}`}
                            className="sponsor-img"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel controls */}
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
                <span className="visually-hidden">Previous</span>
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
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* Button */}
            <div className="position-relative">
              <a
                className="btn btn-outline-light btn-lg d-none d-md-block desktop-btn"
                href="#"
              >
                Vezi Sponsori
              </a>
              <a
                className="btn btn-outline-light btn-lg d-block d-md-none mt-2"
                href="#"
              >
                Vezi Sponsori
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
