import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeItems({ item }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`;
  const title = item.name || item.title;
  const slicedTitle = title.split(" ").slice(0, 3).join(" ");
  const voteAverage = item.vote_average ? item.vote_average.toFixed(1) : null;

  return (
    <div className="col-md-2">
      <Link to={`/moviedetails/${item.id}/${item.media_type}`} className='rounded-3 movie-details text-decoration-none text-dark'>
        <div className="position-relative rounded-3 product">
          <img src={imageUrl} className='w-100' alt={title} />
          <h3 className='h5 text-center pt-2'>{slicedTitle}</h3>
          {voteAverage && <div className="vote position-absolute top-0 end-0 p-1">{voteAverage}</div>}
        </div>
      </Link>
    </div>
  );
}