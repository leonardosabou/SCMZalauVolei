import React, { useState, useEffect } from "react";
import API_URL from "../../config";

interface GameHighlight {
  id: number;
  type: string;
  mediaUrl: string;
}

export const ManageGallery = () => {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [galleryList, setGalleryList] = useState<GameHighlight[]>([]);

  const fetchGallery = () => {
    fetch(`${API_URL}/api/home/highlights`)
      .then((res) => res.json())
      .then((data) => setGalleryList(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchGallery(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return setStatus("⚠️ Selectează o imagine!");

    setStatus("⏳ Se încarcă imaginea pe server...");
    const formData = new FormData();
    formData.append("type", "image");
    formData.append("image", image);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/admin/highlights`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus("✅ Imagine adăugată cu succes în galerie!");
        setImage(null);
        const fileInput = document.getElementById('galleryImageInput') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        
        fetchGallery();
      } else {
        setStatus("❌ Eroare la salvare pe server.");
      }
    } catch (err) {
      setStatus("❌ Eroare de conexiune.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Ești sigur că vrei să ștergi această imagine din galerie?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/admin/highlights/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Gestionare Galerie Foto & Highlights</h3>
      
      <div className="card shadow-sm p-4 mb-5 border-0 bg-light">
        <h5 className="mb-3">Adaugă O Fotografie Nouă</h5>
        {status && <div className="alert alert-info fw-bold">{status}</div>}
        <form onSubmit={handleSubmit} className="row g-3 align-items-end">
          <div className="col-md-9">
            <label className="form-label fw-bold">Selectează Fotografia</label>
            <input 
              id="galleryImageInput"
              type="file" 
              className="form-control" 
              accept="image/*" 
              onChange={e => setImage(e.target.files?.[0] || null)} 
              required 
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100 fw-bold">+ Urcă Poza</button>
          </div>
        </form>
      </div>

      <h5 className="mb-3">Fotografii publicate pe site ({galleryList.length})</h5>
      <div className="row g-3">
        {galleryList.map(g => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={g.id}>
            <div className="card h-100 shadow-sm border-0 position-relative">
              <img 
                src={g.mediaUrl} 
                alt="gallery item" 
                className="card-img-top" 
                style={{ height: "150px", objectFit: "cover" }} 
              />
              <div className="card-body p-2 text-center">
                <button className="btn btn-sm btn-outline-danger w-100 fw-bold" onClick={() => handleDelete(g.id)}>
                  Șterge Poza
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};