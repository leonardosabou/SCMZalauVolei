import React from "react";
import "./ContactPage.css";

export const ContactPage = () => {
  return (
    <div className="contact-page-wrapper">
      <div className="contact-hero">
        <div className="container">
          <h1 className="display-4 fw-bold">CONTACT</h1>
          <p className="lead opacity-75">
            Vrei să intri în legătură cu noi sau să devii partener?
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-50px" }}>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <h3 className="contact-label">Telefonic</h3>
              <p className="contact-text mb-2">
                Ai întrebări urgente? Apelează-ne cu încredere.
              </p>
              <p className="contact-text fw-bold fs-5">
                <a href="tel:0745637050">0745 637 050</a>
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <h3 className="contact-label">Email</h3>
              <p className="contact-text mb-2">
                Pentru propuneri de sponsorizare sau alte detalii.
              </p>
              <p className="contact-text">
                <a href="mailto:volei.scmzalau@gmail.com">volei.scmzalau@gmail.com</a>
                <br />
                <a href="mailto:scmzalau@gmail.com">scmzalau@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <h3 className="contact-label">Locație & Social</h3>
              <p className="contact-text mb-3">
                Str. Stadionului nr. 5, Zalău, Sălaj
              </p>
              
              <div className="social-links-contact">
                <a href="https://www.facebook.com/voleiscmzalau" target="_blank" rel="noreferrer" className="social-btn-lg bg-facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/scm_zalau_volei" target="_blank" rel="noreferrer" className="social-btn-lg bg-instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.youtube.com/@scmzalau3328" target="_blank" rel="noreferrer" className="social-btn-lg bg-youtube">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};