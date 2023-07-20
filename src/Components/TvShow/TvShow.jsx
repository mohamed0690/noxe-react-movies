import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TvShow() {
  const [series, setSeries] = useState(null);
  const numbers = new Array(8).fill(1).map((element, index) => index + 1);
  const [visible, setVisible] = useState(8);
  const mediaType = "tv";

  async function getSeries(page) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=cf4a1f832611fa30173f10337b20dba4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
      );
      setSeries(data.results);
      console.log(data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    getSeries(1);
  }, []);

  function showMore() {
    setVisible((nextValue) => nextValue + 4);
  }

  return (
    <>
      <Helmet>
        <title>Tv</title>
      </Helmet>

      {series ? (
        <div className="row gy-3 gx-3 py-4 ">
          {series.slice(0, visible).map((series, index) => (
            <div key={index} className="col-md-3 ">
              <Link
                to={`/moviedetails/${series.id}/${mediaType}`}
                className="text-decoration-none text-dark"
              >
                <div className=" position-relative  product">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + series.poster_path}
                    className="w-100 "
                    alt={series.name}
                  />
                  <h3 className="h5 text-center pt-2">
                    {" "}
                    {series.name.split(" ").slice(0, 3).join(" ")}
                  </h3>
                  <div className="vote position-absolute top-0 end-0 p-1">
                    {series.vote_average.toFixed(1)}
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {visible !== series.length ? (
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={showMore}
                className="btn btn-outline-warning text-dark fw-bolder w-50  mt-5"
              >
                Show More
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="center">
          <div className="circle"></div>
          <span>LOADING....</span>
        </div>
      )}

      {numbers ? (
        <nav
          aria-label="Page navigation example "
          className="pb-5 pt-2 d-flex justify-content-center align-items-center "
        >
          <ul className="pagination">
            {numbers.map((page, index) => (
              <>
                {" "}
                <li
                  key={index}
                  onClick={() => getSeries(page)}
                  className="page-item "
                >
                  <Link className="page-link fw-bolder text-dark" to={""}>
                    {page}
                  </Link>
                </li>{" "}
              </>
            ))}
          </ul>
        </nav>
      ) : (
        <div className="center">
          <div className="circle"></div>
          <span>LOADING....</span>
        </div>
      )}
    </>
  );
}
