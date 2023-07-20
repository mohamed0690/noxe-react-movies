import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const API_KEY = "cf4a1f832611fa30173f10337b20dba4";
const API_BASE_URL = "https://api.themoviedb.org/3";

const PersonCard = ({ person }) => {
  const { id, name, profile_path } = person;

  return (
    <div key={id} className="col-md-3 ">
      <Link
        to={`/moviedetails/${id}/person`}
        className="text-decoration-none text-dark"
      >
        <div className=" position-relative product">
          {profile_path ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                className="w-100"
                alt={name}
              />
              <h3 className="h5 text-center pt-2">{name}</h3>
            </>
          ) : (
            <h3 className="h5 text-center">{name}</h3>
          )}
        </div>
      </Link>
    </div>
  );
};

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(8);
  const mediaType = "person";
  const numbers = Array.from({ length: 6 }, (_, index) => index + 1);

  const getPeople = async (page) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      setPeople(data.results);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    getPeople(1);
  }, []);

  const showMore = () => {
    setVisible((nextValue) => nextValue + 4);
  };

  return (
    <>
      <Helmet>
        <title>People</title>
      </Helmet>

      {loading ? (
        <div className="center">
          <div className="circle"></div>
          <span>LOADING....</span>
        </div>
      ) : error ? (
        <div className="center">
          <p>{error}</p>
        </div>
      ) : (
        <div className="row gy-3 gx-3 py-4 ">
          {people.slice(0, visible).map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}

          {visible !== people.length ? (
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={showMore}
                className="btn btn-outline-warning text-withe fw-bolder w-50 mt-5"
              >
                Show More
              </button>
            </div>
          ) : null}
        </div>
      )}

      {numbers ? (
        <nav
          aria-label="Page navigation example"
          className="pb-5 pt-2 d-flex justify-content-center align-items-center"
        >
          <ul className="pagination">
            {numbers.map((page, index) => (
              <li
                key={index}
                onClick={() => getPeople(page)}
                className="page-item"
              >
                <Link className="page-link fw-bolder text-dark" to={""}>
                  {page}
                </Link>
              </li>
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
};

export default People;
