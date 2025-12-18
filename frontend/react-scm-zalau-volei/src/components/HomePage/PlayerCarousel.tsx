import React, { useRef, useEffect, useState } from "react";
import "./PlayerCarousel.css"; 

interface GameHighlight {
  id: number;
  type: "image" | "video"; 
  mediaUrl: string;
  description: string;
}

export const PlayerCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [highlights, setHighlights] = useState<GameHighlight[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home/highlights")
      .then((res) => res.json())
      .then((data) => setHighlights(data))
      .catch((err) => console.error("Error fetching highlights:", err));
  }, []);

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
          carousel.querySelector<HTMLButtonElement>(".carousel-control-next")?.click();
        } else {
          carousel.querySelector<HTMLButtonElement>(".carousel-control-prev")?.click();
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
  }, [highlights]);

  if (highlights.length === 0) return null;

  return (
    <section className="player-carousel-section">
      <div className="container carousel-container">
        
        {/* Optional Title */}
        <div className="text-center mb-4">
           <h2 className="section-title">GALERIE MEDIA</h2>
        </div>

        <div
          id="carouselHighlights"
          className="carousel slide"
          data-bs-interval="false"
          ref={carouselRef}
        >
          <div className="carousel-inner">
            {highlights.map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={item.id}
              >
                <div className="d-flex justify-content-center align-items-center py-3">
                  {item.type === "image" ? (
                    <img
                      src={item.mediaUrl}
                      className="img-vertical"
                      alt={item.description}
                    />
                  ) : (
                    <video
                      className="video-vertical" 
                      controls
                      playsInline
                    >
                      <source src={item.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselHighlights"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselHighlights"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="text-center mt-4">
          <a className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold" href="#">
            Vezi Galerie Foto
          </a>
        </div>
      </div>
    </section>
  );
};