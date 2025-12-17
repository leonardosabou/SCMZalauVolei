import { useEffect, useState } from "react";
import "./News.css";

interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

export const News = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/home/news")
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <section className="news-section container-fluid py-5">
      <div className="container-fluid custom-news-container">
        <div className="row mb-5">
          <div className="col-12 text-center text-md-start">
            <h2 className="section-title">ȘTIRI RECENTE</h2>
          </div>
        </div>

        <div className="news-grid">
          {newsList.map((item) => (
            <a
              key={item.id}
              href={item.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-card"
            >
              <div className="card-image-wrapper">
                <img src={item.imageUrl} alt={item.title} className="news-img" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-5">
          <a className="btn btn-outline-dark px-4 py-2 rounded-pill fw-bold" href="#">
            Vezi Toate Știrile
          </a>
        </div>
      </div>
    </section>
  );
};