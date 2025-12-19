import React, { useEffect, useState, useCallback } from "react";
import "./GalleryPage.css";

interface GameHighlight {
  id: number;
  type: "image" | "video";
  mediaUrl: string;
}

export const GalleryPage = () => {
  const [items, setItems] = useState<GameHighlight[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/home/highlights")
      .then((res) => res.json())
      .then((data) => {
        // 1. Get EVERYTHING (Images AND Videos)
        const allMedia = [...data];

        // 2. Random Shuffle (Fisher-Yates algorithm)
        for (let i = allMedia.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allMedia[i], allMedia[j]] = [allMedia[j], allMedia[i]];
        }

        setItems(allMedia);
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  // --- Lightbox Logic ---

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden"; // Disable scroll
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto"; // Re-enable scroll
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (lightboxIndex === null) return;
      setLightboxIndex((prev) => (prev! + 1) % items.length);
    },
    [lightboxIndex, items.length]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (lightboxIndex === null) return;
      setLightboxIndex((prev) => (prev! - 1 + items.length) % items.length);
    },
    [lightboxIndex, items.length]
  );

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <div className="gallery-page-wrapper">
      <div className="gallery-hero">
        <div className="container">
          <h1 className="display-4 fw-bold">GALERIE FOTO</h1>
          <p className="lead opacity-75">
            MOMENTE DIN TEREN ȘI DIN TRIBUNĂ
          </p>
        </div>
      </div>

      <div className="container gallery-container">
        {/* Masonry Grid */}
        <div className="gallery-grid">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              {item.type === "image" ? (
                <img src={item.mediaUrl} loading="lazy" />
              ) : (
                <div className="video-thumbnail-wrapper">
                  {/* Video Preview in Grid */}
                  <video
                    src={item.mediaUrl}
                    className="gallery-video-preview"
                    preload="metadata"
                    muted
                  />
                  <div className="video-icon-overlay">
                    <i className="bi bi-play-circle-fill"></i>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-5 text-muted">
            <h3>Se încarcă galeria...</h3>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close-btn" onClick={closeLightbox}>
            <i className="bi bi-x-lg"></i>
          </button>

          <button className="lightbox-arrow left" onClick={prevImage}>
            <i className="bi bi-chevron-left"></i>
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conditional Rendering inside Lightbox */}
            {items[lightboxIndex].type === "image" ? (
              <img src={items[lightboxIndex].mediaUrl} />
            ) : (
              <video
                src={items[lightboxIndex].mediaUrl}
                controls
                autoPlay
                className="lightbox-video"
              />
            )}

            <div className="lightbox-caption">{"SCM Zalău Volei"}</div>
          </div>

          <button className="lightbox-arrow right" onClick={nextImage}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};
