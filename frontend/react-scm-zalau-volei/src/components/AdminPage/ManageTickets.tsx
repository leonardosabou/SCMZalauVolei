import React, { useState, useEffect } from "react";
import API_URL from "../../config";

export const ManageTickets = () => {
  const [visible, setVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/home/tickets`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setVisible(data.visible);
          setLinkUrl(data.linkUrl || "");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("⏳ Se salvează...");

    const formData = new URLSearchParams();
    formData.append("visible", visible.toString());
    formData.append("linkUrl", linkUrl);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/api/admin/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("✅ Setările butonului de bilete au fost actualizate!");
      } else {
        setStatus("❌ Eroare la salvare.");
      }
    } catch (err) {
      setStatus("❌ Eroare conexiune.");
    }
  };

  return (
    <div>
      <h3 className="mb-4">Vânzare Bilete</h3>
      <div className="card shadow-sm p-4 border-0 bg-light col-md-6">
        {status && <div className="alert alert-info py-2">{status}</div>}
        <form onSubmit={handleSave}>
          <div className="mb-4 form-check form-switch fs-5">
            <input
              className="form-check-input"
              type="checkbox"
              id="ticketSwitch"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
            <label className="form-check-label fw-bold" htmlFor="ticketSwitch">
              Afișează butonul "Bilete" pe site
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Link Platformă Bilete (Bilete.ro, Entertix, etc.)</label>
            <input
              type="url"
              className="form-control"
              placeholder="https://..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Salvează Setările
          </button>
        </form>
      </div>
    </div>
  );
};