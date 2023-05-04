import React from "react";
import s from "../Pagination/Pagination.module.css";

export default function Pagination({ gamesPerPage, allGames, pagination }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className={s.pagination}>
        {pageNumber &&
          pageNumber.map((number) => (
            <li className={s.numbers} key={number}>
              <button className={s.number} onClick={() => pagination(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
