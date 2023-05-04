import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postGames, getAllGenres } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../Form/Form.module.css";

export default function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const handleInput = (e) => {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...game,
        [e.target.name]: e.target.value,
      })
    );
  };

  //añadir y eliminar platforms
  const handleSelectPlatform = (e) => {
    if (
      e.target.value !== "platforms" &&
      !game.platforms.includes(e.target.value)
    ) {
      setGame({
        ...game,
        platforms: [...game.platforms, e.target.value],
      });
    }
  };

  const handleDeletePlatform = (e) => {
    e.preventDefault();
    setGame({
      ...game,
      platforms: game.platforms.filter((plat) => plat !== e.target.value),
    });
  };
  //añadir y eliminar genres
  const handleSelectGenre = (e) => {
    if (e.target.value !== "genres" && !game.genres.includes(e.target.value)) {
      setGame({
        ...game,
        genres: [...game.genres, e.target.value],
      });
    }
  };

  const handleDeleteGenre = (e) => {
    e.preventDefault();
    setGame({
      ...game,
      genres: game.genres.filter((genre) => genre !== e.target.value),
    });
  };

  //Logica para postear el game
  const handleCreate = async (e) => {
    e.preventDefault();
    setError(validate(game));
    if (Object.values(error).length > 0) {
      return alert("Please verify that all fields are filled in correctly");
    } else {
      dispatch(postGames(game));
      alert("Game Created!");
    }
  };

  function validate(input) {
    let error = {};
    if (!input.name) {
      error.name = "The game must have a name";
    }
    if (!input.image) {
      error.image = "The game must have a image";
    }
    if (!input.description) {
      error.description = "The game must have a description";
    }
    if (game.platforms.length === 0) {
      error.platforms = "The game must have at least one platform";
    }
    if (!input.rating) {
      error.rating = "The game must have a rating";
    }
    if (game.genres.length === 0) {
      error.genres = "The game must have at least one genre";
    }
    return error;
  }

  const [game, setGame] = useState({
    name: "",
    image: "",
    platforms: [],
    description: "",
    released: "",
    rating: 0,
    genres: [],
  });

  return (
    <div className={s.container}>
      <div className={s.buttonH}>
        <Link to="/videogames">
          <button className={s.homeb}>Home</button>
        </Link>
      </div>
      <div className={s.formC}>
        <form className={s.form} onSubmit={handleCreate}>
          <h2 className={s.name}>Create Videogame</h2>
          <label>
            <span className={s.titlen}>Name</span>
          </label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            autoComplete="off"
          />
          {error.name && <span className={s.errorn}>{error.name}</span>}
          <label>
            <span className={s.titled}>Description</span>
          </label>
          <input
            type="text"
            name="description"
            onChange={handleInput}
            autoComplete="off"
          />
          {error.description && (
            <span className={s.errord}>{error.description}</span>
          )}
          <label>
            <span className={s.titler}>Released</span>
          </label>
          <input
            type="date"
            name="released"
            onChange={handleInput}
            autoComplete="off"
          />
          <label>
            <span className={s.titlera}>Rating</span>
          </label>
          <input
            type="number"
            name="rating"
            onChange={handleInput}
            autoComplete="off"
            required
            min="1"
            max="5"
            step="0.1"
          />
          {error.rating && <span className={s.errorra}>{error.rating}</span>}
          <label>
            <span className={s.titlei}>Image</span>
          </label>
          <input
            type="text"
            name="image"
            onChange={handleInput}
            autoComplete="off"
          />
          {error.image && <span className={s.errori}>{error.image}</span>}
          <select name="platforms" onChange={handleSelectPlatform}>
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
          {error.platforms && (
            <span className={s.error}>{error.platforms}</span>
          )}
          <div>
            {game.platforms?.map((plat, index) => {
              return (
                <span key={index} className={s.option}>
                  {plat}
                  <button
                    value={plat}
                    onClick={handleDeletePlatform}
                    className={s.btnx}
                  >
                    X
                  </button>
                </span>
              );
            })}
          </div>
          <select name="genres" onChange={handleSelectGenre}>
            <option value="genres">Genres</option>
            {genres?.map((genre, i) => {
              return (
                <option key={i} value={genre.name}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          {error.genres && <span className={s.error}>{error.genres}</span>}
          <div>
            {game.genres?.map((genre, index) => {
              return (
                <span key={index} className={s.option}>
                  {genre}
                  <button
                    value={genre}
                    onClick={handleDeleteGenre}
                    className={s.btnx}
                  >
                    X
                  </button>
                </span>
              );
            })}
          </div>
          <button className={s.buttonD} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
