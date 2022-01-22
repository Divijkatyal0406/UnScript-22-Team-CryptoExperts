
import React from "react";
import "./Navbarteacher.css";


function Navbarteacher() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <a className="navbar-brand " href="3Home">
            CryptoExperts
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="3">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="3">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="3">
                  Feedback
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="3">
                  Update Course
                </a>
              </li>
            </ul>
            <div>
              <button className="btn btn-danger" type="button">
                Signup
              </button>
              <button className="btn btn-danger" type="button">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbarteacher;
