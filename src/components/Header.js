import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/anasayfa">Dizliyorum</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/watchlist">İzleyeceğim Filmler</Link>
            </li>

            <li>
              <Link to="/watchedlist">İzlediğim Filmler</Link>
            </li>

            <li>
              <Link to="/addmovie" className="btn btn-main">
                + EKLE
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
