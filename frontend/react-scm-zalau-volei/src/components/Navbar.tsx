import React from "react";
import logoscm from "../Images/scmzalaulogopng.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
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
              <a className="nav-link px-3" href="#">
                PROGRAM
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#">
                GALERIE FOTO
              </a>
            </li>
            <li className="nav-item ms-lg-2">
              <a className="btn btn-custom btn-sm" href="#">
                Intră în cont
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
