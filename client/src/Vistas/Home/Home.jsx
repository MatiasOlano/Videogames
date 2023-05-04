import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import Pagination from "../../Components/Pagination/Pagination";
import NavBar from "../../Components/NavBar/NavBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import s from "../Home/Home.module.css";

export default function Home() {
  // VIDEOGAMES

  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  // FILTERS

  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState("");

  // PAGINATION

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {allGames.length ? (
        <div className={s.home}>
          <div className={s.nav}>
            <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
          </div>
          <div className={s.search}>
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
          <Link to="/form">
            <button className={s.btn}>Create Videogame</button>
          </Link>
          <div className={s.cards}>
            {currentGames?.map((game) => {
              return (
                <div key={game.id}>
                  <Card
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    image={game.image}
                    genres={game.genres}
                  />
                </div>
              );
            })}
          </div>
          <div className={s.pagination}>
            <Pagination
              gamesPerPage={gamesPerPage}
              allGames={allGames.length}
              pagination={pagination}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
