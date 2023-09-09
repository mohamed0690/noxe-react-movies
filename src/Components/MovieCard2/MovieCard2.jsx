import React from 'react'

import { Link } from 'react-router-dom';

const MovieCard2 = ({media,movie}) => {

  return <>

<div className="col-12 col-sm-4 col-md-3 col-lg-2 ">

<div className='movieCard'>
<Link className='text-decoration-none text-white' to={`/movieDetails2/${movie.id}/${media}`}>
<figure className='m-0' >
{movie.profile_path?<img className=' rounded-5 p-3 ' loading='lazy' src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`} height={270} alt="" />:<img className=' rounded-5 p-3 ' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} height={270} alt="" />}
</figure>
<figcaption>
<p className=' h6 text-center overflow-x-hidden text-nowrap ps-3'>{movie.original_title} {movie.original_name}</p>
{movie.character?<h3 className='h6 text-center ps-3  '>({movie.character})</h3>:null}

<div className='d-flex justify-content-between align-items-center'>

{movie.vote_average?<div>
<i className="fas fa-star rating-color me-1 ps-3"></i>
<span >{movie.vote_average.toFixed(1)}</span>
</div>:null}

{movie.release_date||movie.first_air_date?<span className='bg-dark badge border-danger  '>{movie.release_date} {movie.first_air_date}</span>:null }
</div>
</figcaption>
</Link>
</div>
</div>
    </>
}

export default MovieCard2