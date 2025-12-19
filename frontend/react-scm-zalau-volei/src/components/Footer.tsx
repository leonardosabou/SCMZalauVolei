import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer-section mt-auto">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <h5 className="footer-brand mb-4">SCM ZALĂU VOLEI</h5>
            <p className="footer-text">
              Performanță, pasiune și comunitate. Site-ul oficial al echipei de
              volei care reprezintă orașul Zalău în elita sportului românesc.
            </p>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="footer-title mb-4">CONTACT</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-3">
                <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                Sala Sporturilor, Zalău
              </li>
              <li className="mb-3">
                <i className="bi bi-envelope-fill me-2 text-danger"></i>
                contact@scmzalau.ro
              </li>
              <li className="mb-3">
                <i className="bi bi-telephone-fill me-2 text-danger"></i>
                +40 123 456 789
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h5 className="footer-title mb-4">URMĂREȘTE-NE</h5>
            <div className="d-flex gap-3 mb-4">
              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/voleiscmzalau"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/scm_zalau_volei"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              {/* YOUTUBE */}
              <a
                href="https://www.youtube.com/@scmzalau3328"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </div>
{/*
            <a
              className="btn btn-outline-light btn-sm rounded-pill px-4"
              href="/contact"
            >
              Devino Sponsor
            </a>
*/}
          </div>
        </div>

        <div className="footer-bottom text-center mt-5 pt-4">
          <p className="mb-0 small text-muted">
            &copy; {new Date().getFullYear()} SCM Zalău Volei. Toate drepturile
            rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
};
