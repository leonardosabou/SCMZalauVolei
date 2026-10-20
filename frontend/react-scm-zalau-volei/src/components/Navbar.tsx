import React, { useState, useEffect } from "react";
import logoscm from "../Images/scmzalaulogopng.png";
// @ts-ignore CSS is loaded by the bundler and has no TypeScript declarations.
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import API_URL from "../config";

export const Navbar = () => {
  const [ticketData, setTicketData] = useState({ visible: false, linkUrl: "" });

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

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/" end>
                ACASĂ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/echipa">
                ECHIPA
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/program">
                PROGRAM
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/rezultate">
                REZULTATE
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/stiri">
                ȘTIRI
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/galerie">
                GALERIE FOTO
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/contact">
                CONTACT
              </NavLink>
            </li>
            {ticketData.visible && ticketData.linkUrl && (
              <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
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