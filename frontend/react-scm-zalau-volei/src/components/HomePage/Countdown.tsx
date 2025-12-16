import "./Countdown.css";

export const Countdown = () => {
  return (
    <>
      <div className="top-bar"></div>
      <div className="p-4 container-fluid countdown">
        <div className="container-fluid py-5 position-relative">
          <div className="position-absolute text-white top-0 start-0 ms-0 mt-0">
            <h1 className="fw-bold">SCM Zalau Volei</h1>
          </div>
          <div className="d=flex fle-column justify-content-center align-items-center text-black text-center">
            <h3 className="fw-bold mb-4">Urmatorul meci este in:</h3>
            <h1 className="display-5 fw-bold mb-4">1z 18h 30m 25s</h1>
          </div>
          <div className="position-absolute bottom-0 end-0 me-2 mb-1">
            <a type="button" className="btn btn-outline-light btn-lg" href="#">
              Vezi programul meciurilor
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
