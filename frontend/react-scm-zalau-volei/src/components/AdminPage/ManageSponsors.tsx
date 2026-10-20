import React, { useState, useEffect } from "react";
import API_URL from "../../config";

interface Sponsor {
  id: number;
  name: string;
  linkUrl: string;
  displayOrder: number;
}

export const ManageSponsors = () => {
  const [name, setName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [sponsorsList, setSponsorsList] = useState<Sponsor[]>([]);

  const fetchSponsors = () => {
    fetch(`${API_URL}/api/home/sponsors`)
      .then((res) => res.json())
      .then((data) => setSponsorsList(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchSponsors(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return setStatus("⚠️ Selectează un logo!");

    setStatus("⏳ Se încarcă sponsorul pe server...");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("linkUrl", linkUrl);
    formData.append("displayOrder", displayOrder);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/admin/sponsors`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus("✅ Sponsor adăugat!");
        setName(""); setLinkUrl(""); setDisplayOrder(""); setImage(null);
        fetchSponsors();
      } else setStatus("❌ Eroare la salvare.");
    } catch (err) { setStatus("❌ Eroare de conexiune."); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Ștergi acest sponsor?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/admin/sponsors/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchSponsors();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h3 className="mb-4">Gestionare Sponsori</h3>
      
      <div className="card shadow-sm p-4 mb-5 border-0 bg-light">
        <h5 className="mb-3">Adaugă Sponsor Nou</h5>
        {status && <div className="alert alert-info fw-bold">{status}</div>}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Nume Sponsor</label>
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Link (ex: https://...)</label>
            <input type="url" className="form-control" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Ordine Afișare (Număr 1, 2, 3...)</label>
            <input type="number" className="form-control" value={displayOrder} onChange={e => setDisplayOrder(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Logo (Imagine)</label>
            <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} required />
          </div>
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary px-5 fw-bold">+ Adaugă Sponsor</button>
          </div>
        </form>
      </div>

      <h5 className="mb-3">Sponsori actuali</h5>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr><th>Ordine</th><th>Nume</th><th>Link</th><th>Acțiuni</th></tr>
        </thead>
        <tbody>
          {sponsorsList.map(s => (
            <tr key={s.id}>
              <td>{s.displayOrder}</td>
              <td>{s.name}</td>
              <td><a href={s.linkUrl} target="_blank" rel="noreferrer">Vezi Link</a></td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>Șterge</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};