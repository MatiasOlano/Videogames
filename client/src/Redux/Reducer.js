import {
  GET_GAMES,
  GET_NAME_GAMES,
  GET_DETAILS,
  GET_GENRES,
  FILTER_BY_ALPHA,
  FILTER_BY_RATING,
  FILTER_BY_GENRE,
  FILTER_BY_CREATED,
  FILTER_BY_PLATFORM,
} from "./Constants";
const initialState = {
  videogames: [],
  allGames: [],
  details: [],
  genres: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES: // CASO GET GAMES RETORNA LA COPIA DEL STATE Y CARGA EN ALL GAMES Y GAMES LA INFORMACION DEL PAYLOAD
      return {
        ...state,
        videogames: action.payload,
        allGames: action.payload,
      };
    case GET_NAME_GAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_BY_ALPHA:
      const gamesAlpha = state.videogames;
      const filterByAlpha =
        action.alp === "asc"
          ? gamesAlpha.sort(function (a, b) {
              return a.name.localeCompare(b.name);
            })
          : action.alp === "desc"
          ? gamesAlpha.sort(function (a, b) {
              return b.name.localeCompare(a.name);
            })
          : [...state.videogames];
      return {
        ...state,
        videogames: filterByAlpha,
      };
    case FILTER_BY_RATING:
      const gamesRating = state.allGames;
      const filterByRating =
        action.rate === "high"
          ? gamesRating.sort((a, b) => b.rating - a.rating)
          : action.rate === "low"
          ? gamesRating.sort((a, b) => a.rating - b.rating)
          : [...state.videogames];
      return {
        ...state,
        videogames: filterByRating,
      };
    case FILTER_BY_GENRE:
      const gamesGenre = state.allGames;
      const filterByGenre =
        action.genre === "genres"
          ? gamesGenre
          : gamesGenre.filter((game) => game.genres.includes(action.genre));
      return {
        ...state,
        videogames: filterByGenre,
      };
    case FILTER_BY_PLATFORM:
      const gamesPlatform = state.allGames;
      const filterByPlatform =
        action.platform === "platforms"
          ? gamesPlatform
          : gamesPlatform.filter((games) =>
              games.platforms.includes(action.platform)
            );
      return {
        ...state,
        videogames: filterByPlatform,
      };
    case FILTER_BY_CREATED:
      const gamesCreated = state.allGames;
      const filterByCreated =
        action.value === "created"
          ? gamesCreated.filter((game) => game.id.toString().includes("-"))
          : action.value === "api"
          ? gamesCreated.filter((game) => !game.id.toString().includes("-"))
          : gamesCreated;
      return {
        ...state,
        videogames: filterByCreated,
      };
    default: // HACEMOS UN CASO DEFAULT PARA QUE NO ROMPA EL CODIGO Y DEVUELVA EL INITIAL STATE
      return { ...state };
  }
}
