import React from "react";
import { Link } from "react-router-dom";
import s from "../Card/Card.module.css";

export default function Card({ id, name, image, genres }) {
  return (
    <div className={s.container}>
      <Link style={{ textDecoration: "none" }} to={`/detail/${id}`}>
        <div className={s.card}>
          <img className={s.image} src={image} alt="cover" />
          <h1 className={s.name}>{name}</h1>
          {genres?.map((genre) => {
            return <h2 className={s.genres}>{genre}</h2>;
          })}
        </div>
      </Link>
    </div>
  );
}
