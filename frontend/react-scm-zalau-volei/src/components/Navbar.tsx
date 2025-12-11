import React from "react";
import logoscm from "C:/Users/leona/PP/scm-zalau-volei/01-frontend/react-scm-zalau-volei/src/logoscm.svg";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand d-flex align-items-center">
          <img
            src={logoscm}
            alt="SCM Zalau Volei Logo"
            width="40"
            height="40"
            className="me-2"
          />
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                ACASĂ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                ECHIPA
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                PROGRAM
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                GALERIE FOTO
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              <a type="button" className="btn btn-outline-light" href="#">
                Intră în cont
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
