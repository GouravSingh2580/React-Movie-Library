import { useReducer } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MoviesReducer from "../reducers/MoviesReducer";
import { getSearchResults } from "../helpers/MoviesHelpers";
import Loader from "../components/Loader";
import MovieList from "../components/MovieList";

function Search({ match, baseURL, setSelected }) {
  const query = match.params.query;

  const [state, dispatch] = useReducer(MoviesReducer, {
    loadingMovies: true,
    movies: {},
    errors: [],
  });

  useEffect(() => {
    setSelected("");
    getSearchResults(dispatch, query, 1);
  }, [query, setSelected]);
  console.log("search");

  const { movies, loadingMovies } = state;
  return (
    <div className="text-gray-600 pt-24 min-h-screen flex flex-col justify-center">
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{query}</h1>
      <p className="text-sm uppercase font-bold ml-4">Search Results</p>
      {loadingMovies ? (
        <Loader />
      ) : (
        <MovieList movies={movies} baseURL={baseURL} name={query} />
      )}
    </div>
  );
}

export default Search;
