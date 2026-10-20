import React, { useState, useEffect } from "react";
import API_URL from "../../config";


interface NewsItem {
  id: number;
  title: string;
  date: string;
  linkUrl: string;
}

export const ManageNews = () => {
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const fetchNews = () => {
    fetch(`${API_URL}/api/home/news`)
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Eroare la preluarea știrilor:", err));
  };

  useEffect(() => {
    fetchNews();
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setStatus("⚠️ Te rog să selectezi o imagine!");
      return;
    }

    setStatus("⏳ Se încarcă... te rugăm să aștepți (se trimite la Cloudinary)");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("linkUrl", linkUrl);
    formData.append("date", date);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/admin/news`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("✅ Știrea a fost adăugată cu succes pe site!");
        setTitle("");
        setLinkUrl("");
        setDate("");
        setImage(null);
        fetchNews();
      } else {
        setStatus("❌ A apărut o eroare la salvare pe server.");
      }
    } catch (error) {
      console.error("Eroare:", error);
      setStatus("❌ Nu m-am putut conecta la server.");
    }
  };


  const handleDelete = async (id: number) => {
    if (!window.confirm("Ești sigur că vrei să ștergi această știre?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(`${API_URL}/api/admin/news/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setStatus("🗑️ Știrea a fost ștearsă de pe site!");
        fetchNews();
      } else {
        setStatus("❌ Eroare la ștergerea știrii.");
      }
    } catch (error) {
      console.error("Eroare:", error);
      setStatus("❌ Nu m-am putut conecta la server pentru a șterge.");
    }
  };
  return (
    <div>
      <h3 className="mb-4">Gestionare Știri</h3>
      
      <div className="card shadow-sm p-4 mb-5 border-0 bg-light">
        <h5 className="mb-3">Adaugă o Știre Nouă</h5>
        {status && <div className="alert alert-info fw-bold">{status}</div>}

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Titlu Știre</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Data Știrii</label>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-bold">Link Articol Sursă (ex: graiulsalajului.ro/stire)</label>
            <input type="url" className="form-control" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} required />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-bold">Imagine (Se va optimiza automat)</label>
            <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required />
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary px-5 fw-bold">
              + Publică Știrea
            </button>
          </div>
        </form>
      </div>

      <h5 className="mb-3">Știri publicate pe site ({newsList.length})</h5>
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Titlu</th>
              <th>Link Sursă</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.title}</td>
                <td>
                  <a href={item.linkUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-link">
                    Deschide Articolul
                  </a>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}>
                        Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};