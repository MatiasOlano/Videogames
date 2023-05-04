import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterGenre,
  filterPlatform,
  filterCreated,
  filterAlpha,
  filterRating,
  getAllGenres,
  getAllGames,
} from "../../Redux/Actions";
import s from "./Filters.module.css";

export default function Filter({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  function handleAlpha(e) {
    e.preventDefault();
    dispatch(filterAlpha(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(filterRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleGenre(e) {
    e.preventDefault();
    dispatch(filterGenre(e.target.value));
  }

  function handlePlatform(e) {
    e.preventDefault();
    dispatch(filterPlatform(e.target.value));
  }

  function handleCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }
  const handleReset = async (e) => {
    e.preventDefault();
    await dispatch(getAllGames());
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <select className={s.alpha} onChange={(e) => handleAlpha(e)}>
        <option value="alpha">Alphabetic</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select className={s.rating} onChange={(e) => handleRating(e)}>
        <option value="rating">Rating</option>
        <option value="high">Higer</option>
        <option value="low">Lower</option>
      </select>
      <select className={s.genres} onChange={(e) => handleGenre(e)}>
        <option value="genres">Genres</option>
        {allGenres?.map((gen, i) => (
          <option key={i} value={gen.name}>
            {gen.name}
          </option>
        ))}
      </select>
      <select className={s.platform} onChange={(e) => handlePlatform(e)}>
        <option value="platforms">Platforms</option>
        <option value="PlayStation 5">PlayStation 5</option>
        <option value="PlayStation 4">PlayStation 4</option>
        <option value="PlayStation 3">PlayStation 3</option>
        <option value="PlayStation 2">PlayStation 2</option>
        <option value="PS Vita">PS Vita</option>
        <option value="Xbox Series S/X">Xbox Series S/X</option>
        <option value="Xbox One">Xbox One</option>
        <option value="Xbox 360">Xbox 360</option>
        <option value="Xbox">Xbox</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="Nintendo 3DS">Nintendo 3DS</option>
        <option value="Wii U">Wii U</option>
        <option value="PC">PC</option>
        <option value="Linux">Linux</option>
        <option value="macOS">macOS</option>
        <option value="Android">Android</option>
        <option value="iOS">iOS</option>
        <option value="Web">Web</option>
        <option value="Dreamcast">Dreamcast</option>
      </select>
      <select className={s.created} onChange={(e) => handleCreated(e)}>
        <option value="all">All</option>
        <option value="api">Api</option>
        <option value="created">Created</option>
      </select>
      <button className={s.btn} onClick={(e) => handleReset(e)}>
        Reset Filters
      </button>
    </div>
  );
}
