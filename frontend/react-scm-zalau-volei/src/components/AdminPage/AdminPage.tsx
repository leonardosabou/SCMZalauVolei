import React, { useState } from "react";
// @ts-ignore CSS is loaded by the bundler and has no TypeScript declarations.
import "./AdminPage.css"; 
import API_URL from "../../config";
import { ManageNews } from "./ManageNews";
import { ManageSponsors } from "./ManageSponsors";
import { ManageGallery } from "./ManageGallery";
import { ManageMatches } from "./ManageMatches";
import { ManageResults } from "./ManageResults";
import { ManageTeam } from "./ManageTeam";
import { ManageTickets } from "./ManageTickets";

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("news");
  
  // Verificăm dacă avem deja token-ul salvat în browser
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));
  
  // State-uri pentru Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Salvăm tokenul în browser (Local Storage)
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
      } else {
        setLoginError("User sau parolă incorecte!");
      }
    } catch (err) {
      setLoginError("Eroare de conexiune la server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="container py-5" style={{ marginTop: "100px", maxWidth: "400px" }}>
        <div className="card shadow p-4 border-0">
          <h3 className="text-center mb-4">Autentificare Admin</h3>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-bold">Utilizator</label>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold">Parolă</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Intră în cont</button>
          </form>
        </div>
      </div>
    );
  }

  // Dacă e logat, arătăm Dashboard-ul
  return (
    <div className="container-fluid py-5" style={{ marginTop: "80px" }}>
      <div className="row">
        
        {/* MENIUL LATERAL */}
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="list-group shadow-sm mb-3">
            <button className="list-group-item list-group-item-dark fw-bold text-center" disabled>
              PANOU ADMIN
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'news' ? 'active' : ''}`} onClick={() => setActiveTab('news')}>
              📰 Știri
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'matches' ? 'active' : ''}`} onClick={() => setActiveTab('matches')}>
              📅 Program Meciuri
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
              👥 Echipa
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
              🏆 Rezultate & Clasamente
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
              📸 Galerie
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'sponsors' ? 'active' : ''}`} onClick={() => setActiveTab('sponsors')}>
              🤝 Sponsori
            </button>
            <button className={`list-group-item list-group-item-action ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}>
              🎟️ Bilete
            </button>
          </div>
          
          <button onClick={handleLogout} className="btn btn-outline-danger w-100 fw-bold">
            🚪 Deconectare
          </button>
        </div>

        {/* ZONA DE CONȚINUT */}
        <div className="col-md-9 col-lg-10">
          <div className="card shadow-sm p-4 min-vh-100 border-0">
            {activeTab === 'news' && <ManageNews />}
            {activeTab === 'matches' && <ManageMatches />}
            {activeTab === 'sponsors' && <ManageSponsors />}
            {activeTab === 'gallery' && <ManageGallery />}
            {activeTab === 'results' && <ManageResults />}
            {activeTab === 'team' && <ManageTeam />}
            {activeTab === 'tickets' && <ManageTickets />}
          </div>
        </div>

      </div>
    </div>
  );
};