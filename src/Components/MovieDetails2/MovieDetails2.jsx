import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { movieActors, movieDetails, movieLinks, movieVideos, recommendationsMovies } from '../../Redux/movieDetailsSlice'
import Slider from "react-slick"
import ActorCard from '../ActorCard/ActorCard'
import MoviesCard from './../MoviesCard/MoviesCard';
import { Helmet } from 'react-helmet'
import Loading from './../Loading/Loading';

const MovieDetails2 = () => {
  let {loading}=useSelector((state)=>state.movieDetails)
  let {media , id} =useParams()
  let dispatch = useDispatch()


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1286.7,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  }

const [movies, setMovies] = useState("")
const [actorsDetails, setActorsDetails] = useState([])
const [videos, setMovieVideos] = useState([])
const [moviesList, setMoviesList] = useState([])
const [link, setLink] = useState(null)


const getMoviesHere = async ()=>{
let elements = await dispatch(movieDetails({media,id}))
setMovies(elements.payload)
}

const getMoviesLinks = async()=>{
  let Links = await dispatch(movieLinks({media,id}))
  if(Links?.payload?.US?.link){
    setLink(Links?.payload?.US?.link)
  }
  
}
const watchMovie = async()=>{
  let Links = await dispatch(movieLinks({media,id}))
  window.location.href = Links.payload.US.link 
  
}

const getActorsDetails = async()=>{
  let actors = await dispatch(movieActors({media,id}))
  setActorsDetails(actors.payload)
}

const getMoviesVideos = async()=>{
  let Videos = await dispatch(movieVideos({media,id}))
  setMovieVideos(Videos.payload)
}

const getRecommendationsMovies = async()=>{
  let Movies = await dispatch(recommendationsMovies({media,id}))
  setMoviesList(Movies.payload)
}


useEffect(()=>{
  getMoviesLinks(id)
  getMoviesVideos(id)
  getMoviesHere(media,id)
  getActorsDetails(id)
  getRecommendationsMovies(id)

},[])


  return <>
<Helmet>
<title>Movie Details2</title>
</Helmet>
{!loading?<>
  {movies? <section>
    <div className="background position-relative" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movies?.backdrop_path})`}}>
    <div className="layer"></div>
    <div className="container-fluid px-5 py-5 ">
    <div className="row my-5 py-5 position-relative">

      <div className="col-md-3 col-12">
        <img className='img-fluid rounded-4' loading='lazy' src={`https://image.tmdb.org/t/p/w500${movies?.poster_path}`} alt="" height={400} />
        {link?<button type='button' onClick={watchMovie} className='btn btn-info w-100 text-white'>Watch the movie at TMDB</button>:null}
      </div>

    <div className="col-md-8">
      <h2 className='my-2'>{movies?.original_title} {movies?.original_name} <span className='text-warning small'>{movies?.release_date?.slice(0,4)}  {movies?.first_air_date?.slice(0,4)} </span></h2>
      <p className='text-light lh-3 fw-medium p-2 fs-4'>{movies?.overview}</p>

      {movies.genres.map((type)=><span className='p-2  fst-italic text-bg-info text-black rounded-2 me-4 fs-5  d-none  d-md-inline' key={type.id}>{type.name}</span>)}

<div className='d-flex justify-content-between align-items-center p-5 d-none d-md-flex'>

<div className='rating'>
<h2 className='h4'>Vote_average</h2>
<h2 className="rate m-auto h5">{movies?.vote_average.toFixed(1)} </h2>
</div>

<div>
  <h2 className='h4'>Popularity</h2>
  <h2 className='text-center m-auto h5'>{movies.popularity} </h2>
</div>

<div>
  <h2 className='h4'>Vote Count</h2>
  <h2 className='text-center m-auto h5'>{movies.vote_count}</h2>
</div>


</div>


    </div>
    {actorsDetails.length>8?<div>
  <h2 className='px-5 py-3 fst-italic'>Movie Crew : -</h2>
<Slider  {...settings}>
{actorsDetails.map((movie,index)=><ActorCard media={"person"} movie={movie} key={index}/>)}
</Slider>
</div>:null}

<h2 className='px-5 py-3 fst-italic'>Trailers and Videos : -</h2>

{videos?<div className="row">
  <div className=" col-lg-6 my-2">
  <iframe src={`https://www.youtube-nocookie.com/embed/${videos[0]?.key}`} height="315" title="data.name" className="videos w-100"> </iframe>
  </div>
  <div className="col-lg-6">
  <iframe src={`https://www.youtube-nocookie.com/embed/${videos[1]?.key}`} height="315" title="data.name" className="videos w-100"> </iframe>
  </div>
</div>:null} 
{moviesList.length>6?<div>
<Slider  {...settings}>
{moviesList.map((movie,index)=><MoviesCard media={"movie"} movie={movie} key={index}/>)}
</Slider></div>:null}
    </div>
    </div>
    </div>

    </section>:null}</>:<Loading/>}    </>
}

export default MovieDetails2