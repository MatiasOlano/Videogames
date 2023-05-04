import React from "react";
import { Link } from "react-router-dom";
import start from "../../assets/PressStart.gif";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={s.container}>
      <div>
        <Link to="/videogames">
          <img className={s.gif} src={start} alt="start" />
        </Link>
      </div>
    </div>
  );
}
