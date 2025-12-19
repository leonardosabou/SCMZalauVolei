import React, { useEffect, useState } from "react";
import "./NewsPage.css";

interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
}

export const NewsPage = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home/news")
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Format: 18 Decembrie 2025
    return date.toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="news-page-wrapper">
      <div className="news-hero">
        <div className="container">
          <h1 className="display-4 fw-bold">NOUTĂȚI & PRESĂ</h1>
          <p className="lead opacity-75">Cele mai recente știri despre echipă</p>
        </div>
      </div>

      <div className="container news-container">
        <div className="row g-5">
          {newsList.map((item) => (
            <div className="col-lg-6 col-md-12" key={item.id}>
              
              {/* DATE DISPLAY (On top of the card) */}
              <div className="news-date-label">
                <i className="bi bi-calendar-event me-2"></i>
                {formatDate(item.date)}
              </div>

              <a
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="news-page-card"
              >
                <div className="news-card-image-wrapper">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="news-page-img"
                  />
                  <div className="news-overlay">
                    <h3 className="news-title">{item.title}</h3>
                    <span className="btn-read-more">Citește tot articolul</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        
        {newsList.length === 0 && (
           <div className="text-center py-5 text-muted">
              <h3>Nu există știri momentan.</h3>
           </div>
        )}
      </div>
    </div>
  );
};