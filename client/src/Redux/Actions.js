import {
  GAMES_URL,
  GENRES_URL,
  GET_GAMES,
  GET_NAME_GAMES,
  GET_DETAILS,
  GET_GENRES,
  ERROR,
  FILTER_BY_ALPHA,
  FILTER_BY_RATING,
  FILTER_BY_GENRE,
  FILTER_BY_CREATED,
  FILTER_BY_PLATFORM,
} from "./Constants";
import axios from "axios";

// IMPORTAMOS LOS DOS HTTP://LOCALHOST , MAS EL TYPE DEL DISPATCH

// GET

export function getAllGames() {
  return async function (dispatch) {
    try {
      const games = await axios.get(GAMES_URL);
      dispatch({ type: GET_GAMES, payload: games.data });
    } catch (error) {
      return dispatch({ type: ERROR, payload: error });
    }
  };
}

export function getNameGames(name) {
  return async function (dispatch) {
    try {
      const gamesName = await axios.get(`${GAMES_URL}?name=${name}`);
      return dispatch({ type: GET_NAME_GAMES, payload: gamesName.data });
    } catch (error) {
      return dispatch({ type: ERROR, payload: error });
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const gamesId = await axios.get(`${GAMES_URL}/${id}`);
      return dispatch({ type: GET_DETAILS, payload: gamesId.data });
    } catch (error) {
      return dispatch({ type: ERROR, payload: error });
    }
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get(GENRES_URL);
      dispatch({ type: GET_GENRES, payload: genres.data });
    } catch (error) {
      return dispatch({ type: ERROR, payload: error });
    }
  };
}

// POST

export function postGames(game) {
  return async function () {
    try {
      const newGame = await axios.post(GAMES_URL, game);
      alert(newGame.data.msg);
      return newGame;
    } catch (error) {
      alert(error.response.data.description);
    }
  };
}

// FILTER

export function filterAlpha(alp) {
  return {
    type: FILTER_BY_ALPHA,
    alp,
  };
}

export function filterRating(rate) {
  return {
    type: FILTER_BY_RATING,
    rate,
  };
}

export function filterGenre(genre) {
  return {
    type: FILTER_BY_GENRE,
    genre,
  };
}

export function filterPlatform(platform) {
  return {
    type: FILTER_BY_PLATFORM,
    platform,
  };
}

export function filterCreated(value) {
  return {
    type: FILTER_BY_CREATED,
    value,
  };
}
