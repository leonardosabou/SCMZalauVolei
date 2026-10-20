import React, { useState, useEffect } from "react";
import API_URL from "../../config";

interface MatchResult {
  id: number;
  stage: string;
  imageUrl: string;
}

interface Standing {
  id: number;
  description: string;
  imageUrl: string;
}

export const ManageResults = () => {
  // State pentru Rezultate
  const [results, setResults] = useState<MatchResult[]>([]);
  const [stage, setStage] = useState("");
  const [resultImage, setResultImage] = useState<File | null>(null);
  const [resultStatus, setResultStatus] = useState("");

  // State pentru Clasamente
  const [standings, setStandings] = useState<Standing[]>([]);
  const [description, setDescription] = useState("");
  const [standingImage, setStandingImage] = useState<File | null>(null);
  const [standingStatus, setStandingStatus] = useState("");

  const fetchData = () => {
    fetch(`${API_URL}/api/home/results`)
      .then(res => res.json())
      .then(data => setResults(data));

    fetch(`${API_URL}/api/home/standings`)
      .then(res => res.json())
      .then(data => setStandings(data));
  };

  useEffect(() => fetchData(), []);

  // Handler Rezultate
  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultImage) return setResultStatus("⚠️ Selectează o imagine!");
    setResultStatus("⏳ Se încarcă rezultatul...");

    const formData = new FormData();
    formData.append("stage", stage);
    formData.append("image", resultImage);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/admin/results`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setResultStatus("✅ Rezultat adăugat!");
        setStage(""); setResultImage(null);
        const input = document.getElementById('resultImageInput') as HTMLInputElement;
        if (input) input.value = "";
        fetchData();
      } else setResultStatus("❌ Eroare la salvare.");
    } catch (err) { setResultStatus("❌ Eroare conexiune."); }
  };

  const handleDeleteResult = async (id: number) => {
    if (!window.confirm("Ștergi acest rezultat?")) return;
    const token = localStorage.getItem("adminToken");
    await fetch(`${API_URL}/api/admin/results/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchData();
  };

  // Handler Clasamente
  const handleAddStanding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!standingImage) return setStandingStatus("⚠️ Selectează o imagine!");
    setStandingStatus("⏳ Se încarcă clasamentul...");

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", standingImage);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/admin/standings`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStandingStatus("✅ Clasament adăugat!");
        setDescription(""); setStandingImage(null);
        const input = document.getElementById('standingImageInput') as HTMLInputElement;
        if (input) input.value = "";
        fetchData();
      } else setStandingStatus("❌ Eroare la salvare.");
    } catch (err) { setStandingStatus("❌ Eroare conexiune."); }
  };

  const handleDeleteStanding = async (id: number) => {
    if (!window.confirm("Ștergi acest clasament?")) return;
    const token = localStorage.getItem("adminToken");
    await fetch(`${API_URL}/api/admin/standings/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchData();
  };

  return (
    <div>
      <h3 className="mb-4">Gestionare Rezultate & Clasamente</h3>

      <div className="row">
        {/* COLOANA REZULTATE */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 mb-4 border-0 bg-light">
            <h5 className="mb-3 text-primary">Adaugă Grafic Rezultat</h5>
            {resultStatus && <div className="alert alert-info py-2">{resultStatus}</div>}
            <form onSubmit={handleAddResult}>
              <div className="mb-3">
                <label className="form-label fw-bold">Etapa / Meciul (ex: Etapa 5 vs Steaua)</label>
                <input type="text" className="form-control" value={stage} onChange={e => setStage(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Imagine Scor</label>
                <input id="resultImageInput" type="file" className="form-control" accept="image/*" onChange={e => setResultImage(e.target.files?.[0] || null)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold">+ Adaugă Rezultat</button>
            </form>
          </div>

          <h6 className="fw-bold">Rezultate Publicate</h6>
          <div className="d-flex flex-column gap-3">
            {results.map(r => (
              <div key={r.id} className="card shadow-sm border-0 p-2 d-flex flex-row align-items-center justify-content-between">
                <div>
                  <span className="badge bg-dark me-2">{r.stage}</span>
                  <a href={r.imageUrl} target="_blank" rel="noreferrer">Vezi Poza</a>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteResult(r.id)}>Șterge</button>
              </div>
            ))}
          </div>
        </div>

        {/* COLOANA CLASAMENTE */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 mb-4 border-0" style={{ backgroundColor: "#f8f9fa" }}>
            <h5 className="mb-3 text-success">Adaugă Grafic Clasament</h5>
            {standingStatus && <div className="alert alert-info py-2">{standingStatus}</div>}
            <form onSubmit={handleAddStanding}>
              <div className="mb-3">
                <label className="form-label fw-bold">Competiție (ex: Divizia A1)</label>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Imagine Clasament</label>
                <input id="standingImageInput" type="file" className="form-control" accept="image/*" onChange={e => setStandingImage(e.target.files?.[0] || null)} required />
              </div>
              <button type="submit" className="btn btn-success w-100 fw-bold">+ Adaugă Clasament</button>
            </form>
          </div>

          <h6 className="fw-bold">Clasamente Publicate</h6>
          <div className="d-flex flex-column gap-3">
            {standings.map(s => (
              <div key={s.id} className="card shadow-sm border-0 p-2 d-flex flex-row align-items-center justify-content-between">
                <div>
                  <span className="badge bg-success me-2">{s.description}</span>
                  <a href={s.imageUrl} target="_blank" rel="noreferrer">Vezi Poza</a>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteStanding(s.id)}>Șterge</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};