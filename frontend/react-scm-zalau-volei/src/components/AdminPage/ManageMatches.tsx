import React, { useState, useEffect } from "react";
import API_URL from "../../config";

interface MatchGame {
  id: number;
  opponent: string;
  opponentLogoUrl: string;
  date: string;
  location: string;
  competition: string;
  finished: boolean;
}

export const ManageMatches = () => {
  const [matches, setMatches] = useState<MatchGame[]>([]);
  const [status, setStatus] = useState("");

  // Form states pt adaugare
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Acasa");
  const [competition, setCompetition] = useState("Divizia A1");
  const [image, setImage] = useState<File | null>(null);

  // States pt editare inline
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editFinished, setEditFinished] = useState(false);

  const fetchMatches = () => {
    fetch(`${API_URL}/api/home/program`)
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => fetchMatches(), []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !date) return setStatus("⚠️ Completează toate câmpurile și alege un logo!");

    setStatus("⏳ Se adaugă meciul...");
    const formData = new FormData();
    formData.append("opponent", opponent);
    formData.append("date", date); // Format nativ YYYY-MM-DDTHH:mm
    formData.append("location", location);
    formData.append("competition", competition);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/admin/matches`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setStatus("✅ Meci adăugat cu succes!");
        setOpponent(""); setDate(""); setImage(null);
        fetchMatches();
      } else {
        setStatus("❌ Eroare la salvare.");
      }
    } catch (err) { setStatus("❌ Eroare de conexiune."); }
  };

  const handleUpdate = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new URLSearchParams();
      formData.append("date", editDate);
      formData.append("isFinished", editFinished.toString());

      const res = await fetch(`${API_URL}/api/admin/matches/${id}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData,
      });

      if (res.ok) {
        setEditingId(null);
        fetchMatches();
      } else {
        alert("Eroare la actualizare");
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Ștergi definitiv acest meci?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/admin/matches/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchMatches();
    } catch (err) { console.error(err); }
  };

  const startEditing = (m: MatchGame) => {
    setEditingId(m.id);
    // Tăiem secundele (dacă există) pentru ca input-ul datetime-local să funcționeze corect
    setEditDate(m.date.substring(0, 16)); 
    setEditFinished(m.finished);
  };

  return (
    <div>
      <h3 className="mb-4">Program Meciuri</h3>
      
      {/* FORMULAR ADĂUGARE */}
      <div className="card shadow-sm p-4 mb-5 border-0 bg-light">
        <h5 className="mb-3">Adaugă Meci Nou</h5>
        {status && <div className="alert alert-info fw-bold">{status}</div>}
        <form onSubmit={handleAdd} className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-bold">Echipă Adversară</label>
            <input type="text" className="form-control" value={opponent} onChange={e => setOpponent(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Data și Ora</label>
            <input type="datetime-local" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Locație</label>
            <select className="form-select" value={location} onChange={e => setLocation(e.target.value)}>
              <option value="Acasa">Acasă</option>
              <option value="Deplasare">Deplasare</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Competiție</label>
            <select className="form-select" value={competition} onChange={e => setCompetition(e.target.value)}>
              <option value="Divizia A1">Divizia A1</option>
              <option value="Cupa Romaniei">Cupa României</option>
              <option value="CEV">CEV Volleyball</option>
            </select>
          </div>
          <div className="col-md-5">
            <label className="form-label fw-bold">Logo Adversar</label>
            <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} required />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100 fw-bold">+ Adaugă</button>
          </div>
        </form>
      </div>

      {/* LISTA MECIURI */}
      <h5 className="mb-3">Meciuri Programate</h5>
      <table className="table table-bordered align-middle">
        <thead className="table-dark">
          <tr><th>Adversar</th><th>Competiție</th><th>Locație</th><th>Data & Ora</th><th>Status</th><th>Acțiuni</th></tr>
        </thead>
        <tbody>
          {matches.map(m => (
            <tr key={m.id} className={m.finished ? "table-secondary" : ""}>
              <td>
                <img src={m.opponentLogoUrl} alt="logo" style={{width: "30px", marginRight: "10px"}} />
                {m.opponent}
              </td>
              <td>{m.competition}</td>
              <td>{m.location}</td>
              
              {/* EDIT MODE: DATA */}
              <td>
                {editingId === m.id ? (
                  <input type="datetime-local" className="form-control form-control-sm" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                ) : (
                  new Date(m.date).toLocaleString('ro-RO', { dateStyle: 'short', timeStyle: 'short' })
                )}
              </td>

              {/* EDIT MODE: STATUS JUCAT */}
              <td>
                {editingId === m.id ? (
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" checked={editFinished} onChange={(e) => setEditFinished(e.target.checked)} />
                    <label className="form-check-label">Jucat</label>
                  </div>
                ) : (
                  m.finished ? <span className="badge bg-secondary">Jucat</span> : <span className="badge bg-success">Urmează</span>
                )}
              </td>

              {/* BUTOANE ACȚIUNE */}
              <td>
                {editingId === m.id ? (
                  <>
                    <button className="btn btn-sm btn-success me-2" onClick={() => handleUpdate(m.id)}>Salvează</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Anulează</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEditing(m)}>Editează</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}>Șterge</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};