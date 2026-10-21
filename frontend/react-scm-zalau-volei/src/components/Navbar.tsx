import React, { useState, useEffect } from "react";
import logoscm from "../Images/scmzalaulogopng.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import API_URL from "../config";

export const Navbar = () => {
  const [ticketData, setTicketData] = useState({ visible: false, linkUrl: "" });
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);

  useEffect(() => {
    fetch(`${API_URL}/api/home/tickets`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setTicketData(data);
      })
      .catch((err) => console.error("Error fetching ticket settings:", err));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <span className="navbar-brand d-flex align-items-center">
          <img
            src={logoscm}
            alt="SCM Zalau Volei Logo"
            width="70"
            height="70"
            className="me-2"
          />
          <span className="d-none d-sm-block fw-bold">SCM ZALĂU</span>
        </span>

        <div className="d-flex align-items-center gap-3">
          {ticketData.visible && ticketData.linkUrl && (
            <a
              href={ticketData.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-warning fw-bold px-3 py-1 rounded-pill shadow-sm text-dark d-flex align-items-center gap-1 d-lg-none"
              style={{ fontSize: "14px" }}
            >
              <span>🎟️</span> BILETE
            </a>
          )}

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`} id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/" end onClick={closeNav}>
                ACASĂ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/echipa" onClick={closeNav}>
                ECHIPA
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/program" onClick={closeNav}>
                PROGRAM
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/rezultate" onClick={closeNav}>
                REZULTATE
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/stiri" onClick={closeNav}>
                ȘTIRI
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/galerie" onClick={closeNav}>
                GALERIE FOTO
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/contact" onClick={closeNav}>
                CONTACT
              </NavLink>
            </li>
            
            {ticketData.visible && ticketData.linkUrl && (
              <li className="nav-item ms-lg-3 mt-3 mt-lg-0 d-none d-lg-block">
                <a
                  href={ticketData.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-warning fw-bold px-4 rounded-pill shadow-sm text-dark d-flex align-items-center gap-2"
                >
                  <span>🎟️</span> BILETE
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};