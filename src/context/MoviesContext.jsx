import { createContext, useReducer, useContext } from "react";

const ACTIONS = {
  FETCH_MOVIES_START: "FETCH_MOVIES_START",
  FETCH_MOVIES_SUCCESS: "FETCH_MOVIES_SUCCESS",
  FETCH_MOVIES_ERROR: "FETCH_MOVIES_ERROR",
  FETCH_MOVIE_DETAILS_START: "FETCH_MOVIE_DETAILS_START",
  FETCH_MOVIE_DETAILS_SUCCESS: "FETCH_MOVIE_DETAILS_SUCCESS",
  FETCH_MOVIE_DETAILS_ERROR: "FETCH_MOVIE_DETAILS_ERROR",
};

const genreMap = {
  action: 28,
  comedy: 35,
  drama: 18,
  horror: 27,
  "sci-fi": 878,
};

const initialState = {
  movies: [],
  selectedMovie: null, // Para guardar los detalles
  favorites: [],
  loading: false,
  loadingDetails: false, // Loading separado para detalles
  error: null,
  detailsError: null,
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_MOVIES_START:
      return { ...state, loading: true, error: null };
    case ACTIONS.FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.payload };
    case ACTIONS.FETCH_MOVIES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ACTIONS.FETCH_MOVIE_DETAILS_START:
      return { ...state, loadingDetails: true, detailsError: null };
    case ACTIONS.FETCH_MOVIE_DETAILS_SUCCESS:
      return { ...state, loadingDetails: false, selectedMovie: action.payload };
    case ACTIONS.FETCH_MOVIE_DETAILS_ERROR:
      return { ...state, loadingDetails: false, detailsError: action.payload };
    default:
      return state;
  }
};

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const API_KEY = "5612bf52a661b15ce2028b6605b65b64";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const language = "es-MX";

  const fetchPeliculasPopulares = async (page = 1) => {
    dispatch({ type: ACTIONS.FETCH_MOVIES_START });

    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=${language}`
      );

      if (!response.ok) {
        throw new Error("Error al cargar películas");
      }

      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_MOVIES_SUCCESS, payload: data.results });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_MOVIES_ERROR, payload: error.message });
    }
  };

  const fetchPeliculasMejorCalificadas = async (page = 1) => {
    dispatch({ type: ACTIONS.FETCH_MOVIES_START });

    try {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=${language}`
      );

      if (!response.ok) {
        throw new Error("Error al cargar películas");
      }

      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_MOVIES_SUCCESS, payload: data.results });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_MOVIES_ERROR, payload: error.message });
    }
  };

  const buscarPeliculas = async (query) => {
    dispatch({ type: ACTIONS.FETCH_MOVIES_START });

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=${language}`
      );

      if (!response.ok) {
        throw new Error("Error al cargar películas");
      }

      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_MOVIES_SUCCESS, payload: data.results });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_MOVIES_ERROR, payload: error.message });
    }
  };

  const buscarPeliculasPorGenero = async (genre, page = 1) => {
    const genreId = genreMap[genre.toLowerCase()];
    if (!genreId) return;
    dispatch({ type: ACTIONS.FETCH_MOVIES_START });

    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&language=${language}`
      );

      if (!response.ok) {
        throw new Error("Error al cargar películas");
      }

      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_MOVIES_SUCCESS, payload: data.results });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_MOVIES_ERROR, payload: error.message });
    }
  };

  const detallesPeliculas = async (movieId) => {
    dispatch({ type: ACTIONS.FETCH_MOVIE_DETAILS_START });

    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${language}`
      );

      if (!response.ok) {
        throw new Error("Película no encontrada");
      }

      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_MOVIE_DETAILS_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: ACTIONS.FETCH_MOVIE_DETAILS_ERROR,
        payload: error.message,
      });
      throw error;
    }
  };

  const value = {
    ...state,
    fetchPeliculasPopulares,
    fetchPeliculasMejorCalificadas,
    buscarPeliculas,
    detallesPeliculas,
    buscarPeliculasPorGenero,
    IMAGE_BASE_URL,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies debe ser usado dentro de MoviesProvider");
  }
  return context;
};
