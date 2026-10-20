import React, { useState, useEffect } from "react";
import API_URL from "../../config";

interface Player {
  id: number;
  name: string;
  shirtNumber: number;
  nationality: string;
  position: string;
  height: string;
  dateOfBirth: string;
  imageUrl: string;
  volleyboxUrl: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export const ManageTeam = () => {
  const [view, setView] = useState<"players" | "staff">("players");

  const [players, setPlayers] = useState<Player[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  // States pt Jucător
  const [editPlayerId, setEditPlayerId] = useState<number | null>(null);
  const [pName, setPName] = useState("");
  const [pNumber, setPNumber] = useState("");
  const [pNationality, setPNationality] = useState("");
  const [pPosition, setPPosition] = useState("Secund");
  const [pHeight, setPHeight] = useState("");
  const [pDob, setPDob] = useState("");
  const [pVolleybox, setPVolleybox] = useState("");
  const [pImage, setPImage] = useState<File | null>(null);
  const [pStatus, setPStatus] = useState("");

  // States pt Staff
  const [editStaffId, setEditStaffId] = useState<number | null>(null);
  const [sName, setSName] = useState("");
  const [sRole, setSRole] = useState("");
  const [sImage, setSImage] = useState<File | null>(null);
  const [sStatus, setSStatus] = useState("");

  const fetchTeam = () => {
    // Am corectat URL-urile de fetch pentru a corespunde cu pagina ta
    fetch(`${API_URL}/api/home/team/players`)
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? setPlayers(data) : setPlayers([]))
      .catch(() => setPlayers([]));

    fetch(`${API_URL}/api/home/team/staff`)
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? setStaffList(data) : setStaffList([]))
      .catch(() => setStaffList([]));
  };

  useEffect(() => fetchTeam(), []);

  const resetPlayerForm = () => {
    setEditPlayerId(null);
    setPName(""); setPNumber(""); setPNationality(""); setPHeight(""); 
    setPDob(""); setPVolleybox(""); setPImage(null);
  };

  const startEditPlayer = (p: Player) => {
    setEditPlayerId(p.id);
    setPName(p.name);
    setPNumber(p.shirtNumber.toString());
    setPNationality(p.nationality);
    setPPosition(p.position);
    setPHeight(p.height);
    setPDob(p.dateOfBirth);
    setPVolleybox(p.volleyboxUrl || "");
    setPImage(null); // Imaginea este opțională la editare
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSavePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlayerId && !pImage) return setPStatus("⚠️ Imaginea este obligatorie pentru jucătorii noi!");
    setPStatus("⏳ Se salvează jucătorul...");

    const formData = new FormData();
    formData.append("name", pName);
    formData.append("shirtNumber", pNumber);
    formData.append("nationality", pNationality);
    formData.append("position", pPosition);
    formData.append("height", pHeight);
    formData.append("dateOfBirth", pDob);
    formData.append("volleyboxUrl", pVolleybox);
    if (pImage) formData.append("image", pImage);

    try {
      const token = localStorage.getItem("adminToken");
      const url = editPlayerId ? `${API_URL}/api/admin/players/${editPlayerId}` : `${API_URL}/api/admin/players`;
      const method = editPlayerId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setPStatus("✅ Jucător salvat!");
        resetPlayerForm();
        fetchTeam();
      } else setPStatus("❌ Eroare la salvare.");
    } catch (err) { setPStatus("❌ Eroare conexiune."); }
  };

  const handleDeletePlayer = async (id: number) => {
    if (!window.confirm("Ștergi definitiv acest jucător?")) return;
    const token = localStorage.getItem("adminToken");
    await fetch(`${API_URL}/api/admin/players/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
    fetchTeam();
  };

  // Staff Handlers
  const resetStaffForm = () => {
    setEditStaffId(null);
    setSName(""); setSRole(""); setSImage(null);
  };

  const startEditStaff = (s: Staff) => {
    setEditStaffId(s.id);
    setSName(s.name);
    setSRole(s.role);
    setSImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStaffId && !sImage) return setSStatus("⚠️ Imagine obligatorie!");
    setSStatus("⏳ Se salvează...");

    const formData = new FormData();
    formData.append("name", sName);
    formData.append("role", sRole);
    if (sImage) formData.append("image", sImage);

    try {
      const token = localStorage.getItem("adminToken");
      const url = editStaffId ? `${API_URL}/api/admin/staff/${editStaffId}` : `${API_URL}/api/admin/staff`;
      const method = editStaffId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setSStatus("✅ Membru staff salvat!");
        resetStaffForm();
        fetchTeam();
      } else setSStatus("❌ Eroare la salvare.");
    } catch (err) { setSStatus("❌ Eroare conexiune."); }
  };

  const handleDeleteStaff = async (id: number) => {
    if (!window.confirm("Ștergi acest membru staff?")) return;
    const token = localStorage.getItem("adminToken");
    await fetch(`${API_URL}/api/admin/staff/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
    fetchTeam();
  };

  return (
    <div>
      <h3 className="mb-4">Lotul Echipei & Staff</h3>

      <div className="btn-group mb-4" role="group">
        <button className={`btn ${view === "players" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => { setView("players"); resetStaffForm(); }}>
          Jucători
        </button>
        <button className={`btn ${view === "staff" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => { setView("staff"); resetPlayerForm(); }}>
          Staff Tehnic
        </button>
      </div>

      {view === "players" && (
        <div className="row">
          <div className="col-md-5">
            <div className={`card shadow-sm p-4 border-0 ${editPlayerId ? "bg-warning-subtle" : "bg-light"}`}>
              <h5 className="mb-3">{editPlayerId ? "Editează Jucătorul" : "Adaugă Jucător"}</h5>
              {pStatus && <div className="alert alert-info py-2">{pStatus}</div>}
              <form onSubmit={handleSavePlayer} className="row g-2">
                <div className="col-12"><input type="text" className="form-control" placeholder="Nume Complet" value={pName} onChange={e => setPName(e.target.value)} required /></div>
                <div className="col-6"><input type="number" className="form-control" placeholder="Număr tricou" value={pNumber} onChange={e => setPNumber(e.target.value)} required /></div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Înălțime (ex: 198 cm)" value={pHeight} onChange={e => setPHeight(e.target.value)} required /></div>
                <div className="col-6">
                  <select className="form-select" value={pPosition} onChange={e => setPPosition(e.target.value)}>
                    <option value="Coordonator">Coordonator</option>
                    <option value="Extremă/Secund">Extremă/Secund</option>
                    <option value="Centru">Centru</option>
                    <option value="Universal">Universal</option>
                    <option value="Libero">Libero</option>
                  </select>
                </div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Naționalitate" value={pNationality} onChange={e => setPNationality(e.target.value)} required /></div>
                <div className="col-12"><label className="small text-muted mb-1">Data Nașterii</label><input type="date" className="form-control" value={pDob} onChange={e => setPDob(e.target.value)} required /></div>
                <div className="col-12"><input type="url" className="form-control" placeholder="Link Volleybox (Opțional)" value={pVolleybox} onChange={e => setPVolleybox(e.target.value)} /></div>
                <div className="col-12"><label className="small text-muted mb-1">{editPlayerId ? "Încarcă poză nouă (lasă gol pt a o păstra pe cea veche)" : "Poza (fără fundal / PNG)"}</label><input type="file" className="form-control" accept="image/*" onChange={e => setPImage(e.target.files?.[0] || null)} /></div>
                
                <button type="submit" className="btn btn-primary mt-3 w-100 fw-bold">{editPlayerId ? "Salvează Modificările" : "+ Adaugă Jucător"}</button>
                {editPlayerId && <button type="button" className="btn btn-secondary mt-2 w-100 fw-bold" onClick={resetPlayerForm}>Anulează Editarea</button>}
              </form>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row g-3">
              {players.map(p => (
                <div key={p.id} className="col-sm-6 col-lg-4">
                  <div className="card text-center shadow-sm border-0 h-100">
                    <img src={p.imageUrl} alt={p.name} className="card-img-top mx-auto mt-2" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }} />
                    <div className="card-body p-2 d-flex flex-column">
                      <h6 className="mb-0 fw-bold">{p.name} (#{p.shirtNumber})</h6>
                      <small className="text-muted d-block mb-2">{p.position}</small>
                      <div className="mt-auto d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary flex-fill" onClick={() => startEditPlayer(p)}>Editează</button>
                        <button className="btn btn-sm btn-outline-danger flex-fill" onClick={() => handleDeletePlayer(p.id)}>Șterge</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "staff" && (
        <div className="row">
          <div className="col-md-5">
            <div className={`card shadow-sm p-4 border-0 ${editStaffId ? "bg-warning-subtle" : "bg-light"}`}>
              <h5 className="mb-3">{editStaffId ? "Editează Staff" : "Adaugă Staff"}</h5>
              {sStatus && <div className="alert alert-info py-2">{sStatus}</div>}
              <form onSubmit={handleSaveStaff} className="row g-2">
                <div className="col-12"><input type="text" className="form-control" placeholder="Nume Complet" value={sName} onChange={e => setSName(e.target.value)} required /></div>
                <div className="col-12"><input type="text" className="form-control" placeholder="Rol (ex: Antrenor Principal)" value={sRole} onChange={e => setSRole(e.target.value)} required /></div>
                <div className="col-12"><label className="small text-muted mb-1">{editStaffId ? "Încarcă poză nouă (sau lasă gol)" : "Poză de profil"}</label><input type="file" className="form-control" accept="image/*" onChange={e => setSImage(e.target.files?.[0] || null)} /></div>
                
                <button type="submit" className="btn btn-primary mt-3 w-100 fw-bold">{editStaffId ? "Salvează Modificările" : "+ Adaugă Staff"}</button>
                {editStaffId && <button type="button" className="btn btn-secondary mt-2 w-100 fw-bold" onClick={resetStaffForm}>Anulează Editarea</button>}
              </form>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row g-3">
              {staffList.map(s => (
                <div key={s.id} className="col-sm-6 col-lg-4">
                  <div className="card text-center shadow-sm border-0 h-100">
                    <img src={s.imageUrl} alt={s.name} className="card-img-top mx-auto mt-2" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }} />
                    <div className="card-body p-2 d-flex flex-column">
                      <h6 className="mb-0 fw-bold">{s.name}</h6>
                      <small className="text-muted d-block mb-2">{s.role}</small>
                      <div className="mt-auto d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary flex-fill" onClick={() => startEditStaff(s)}>Editează</button>
                        <button className="btn btn-sm btn-outline-danger flex-fill" onClick={() => handleDeleteStaff(s.id)}>Șterge</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};