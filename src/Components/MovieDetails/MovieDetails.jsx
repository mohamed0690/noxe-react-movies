import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'cf4a1f832611fa30173f10337b20dba4';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetails() {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id, mediaType } = useParams();

  async function fetchDetails(id, mediaType) {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
      );
      setDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails(id, mediaType);
  }, [id, mediaType]);

  const renderTitle = () => {
    return details.title || details.name || 'Movie Title Not Available';
  };

  const renderOverview = () => {
    return details.overview || details.biography || 'Overview Not Available';
  };

  const renderAdditionalDetails = () => {
    return (
      <>
        {details.vote_average && (
          <h6 className='h4'>
            Views Rate : <span className='text-info mx-2'>{details.vote_average}</span>
          </h6>
        )}
        {details.release_date && (
          <h6 className='h4'>
            Release Date : <span className='text-info mx-2'>{details.release_date}</span>
          </h6>
        )}
        {details.runtime && (
          <h6 className='h4'>
            Runtime : <span className='text-info mx-2'>{details.runtime} Minutes</span>
          </h6>
        )}
        {details.original_language && (
          <h6 className='h4'>
            Original Language : <span className='text-info mx-2'>{details.original_language}</span>
          </h6>
        )}
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Movie Details</title>
      </Helmet>

      {isLoading ? (
        <div className='text-center py-5'>
          <i className='fas fa-spinner fa-spin fa-3x'></i>
          <p>Loading...</p>
        </div>
      ) : (
        <div className='row py-4'>
          <div className='col-md-3 py-4'>
            <img src={`${IMAGE_BASE_URL}${details.poster_path || details.profile_path}`} className='w-100 product' alt={renderTitle()} />
          </div>

          <div className='col-md-7 py-4 d-flex align-items-center'>
            <div>
              <h2>{renderTitle()}</h2>
              <p className='text-muted my-4'>{renderOverview()}</p>
              {renderAdditionalDetails()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
