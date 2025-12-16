import React, { useRef, useEffect } from "react";
import player1 from "../../Images/BooksImages/new-book-1.png";
import player2 from "../../Images/BooksImages/new-book-2.png";
import player3 from "../../Images/BooksImages/book-luv2code-1000.png";
import player4 from "../../Videos/demo.mp4";
import "./PlayerCarousel.css";

export const PlayerCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const players = [
    { type: "image", src: player1, alt: "player1" },
    { type: "image", src: player2, alt: "player2" },
    { type: "image", src: player3, alt: "player3" },
    { type: "video", src: player4, alt: "player4" },
  ];

  // Swipe support logic (kept exactly as you had it)
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
    <section className="player-carousel-section">
      <div className="container carousel-container">

        <div
          id="carouselControls"
          className="carousel slide"
          data-bs-interval="false"
          ref={carouselRef}
        >
          <div className="carousel-inner">
            {players.map((player, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <div className="d-flex justify-content-center align-items-center py-3">
                  {player.type === "image" ? (
                    <img
                      src={player.src}
                      className="img-vertical"
                      alt={player.alt}
                    />
                  ) : (
                    <video
                      className="video-vertical"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={player.src} type="video/mp4" />
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
            data-bs-target="#carouselControls"
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
            data-bs-target="#carouselControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="text-center mt-4">
          <a
            className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold"
            href="#"
          >
            Vezi Galerie Foto
          </a>
        </div>
      </div>
    </section>
  );
};
