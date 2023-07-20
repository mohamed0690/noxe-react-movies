import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const API_KEY = "cf4a1f832611fa30173f10337b20dba4";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const MEDIA_TYPE = "movie";

const MovieCard = ({ movie }) => (
  <div className="col-md-3 ">
    <Link
      to={`/moviedetails/${movie.id}/${MEDIA_TYPE}`}
      className="text-decoration-none text-black"
    >
      <div className="position-relative product">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          className="w-100"
          alt={movie.title}
        />
        <h3 className="h5 text-center text-dark pt-2">
          {movie.title.split(" ").slice(0, 3).join(" ")}
        </h3>
        <div className="vote position-absolute top-0 end-0 p-1">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  </div>
);

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [page, setPage] = useState(1);

  async function getMovies(page) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
      );
      setMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMovies(page);
  }, [page]);

  const toggleShowAllMovies = () => {
    setShowAllMovies((prev) => !prev);
  };

  const renderMovies = () => {
    if (isLoading) {
      return (
        <div className="center">
          <div className="circle"></div>
          <span>LOADING....</span>
        </div>
      );
    }

    const visibleMovies = showAllMovies ? movies : movies.slice(0, 8);
    return (
      <>
        <div className="row gy-3 gx-3 py-4">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {movies.length > 8 && (
          <div className="d-flex justify-content-center align-items-center">
            <button
              onClick={toggleShowAllMovies}
              className="btn btn-outline-warning text-dark fw-bolder w-50 mt-5"
            >
              {showAllMovies ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </>
    );
  };

  const renderPagination = () => {
    const numbers = new Array(10).fill(1).map((_, index) => index + 1);
    return (
      <nav
        aria-label="Page navigation example"
        className="pb-5 pt-2 d-flex justify-content-center align-items-center"
      >
        <ul className="pagination">
          {numbers.map((num) => (
            <li key={num} onClick={() => setPage(num)} className="page-item">
              <Link className="page-link fw-bolder text-dark" to={""}>
                {num}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>
      {renderMovies()}
      {renderPagination()}
    </>
  );
}
