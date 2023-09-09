import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getActorsDetails, getActorsMovies } from '../../Redux/actorsDetailsSlice'
import Slider from "react-slick"
import MoviesCard from './../MoviesCard/MoviesCard';
import {Helmet} from "react-helmet";
import { useSelector } from 'react-redux';
import Loading from './../Loading/Loading';

const ActorDetails = () => {
  let {loading}=useSelector((state)=>state.actorsDetails)
let {id}=useParams()
let dispatch = useDispatch()

const [details, setDetails] = useState({})
const [moviesDetails, setMoviesDetails] = useState([])

const getDetails =async ()=>{
  let details = await dispatch(getActorsDetails(id))
  setDetails(details?.payload)

}

const getMovies =async ()=>{
  let details = await dispatch(getActorsMovies(id))

  setMoviesDetails(details?.payload?.cast)
}

useEffect(()=>{

  getDetails(id)
  getMovies(id)

},[])

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

  return <>
<Helmet>
<title>Actor Details</title>
</Helmet>
{!loading?<>
{details?<section>
<div className="container-fluid px-5 py-5 ">
  <div className="row my-5 py-5 position-relative">

  <div className="col-sm-3">
        <img className='img-fluid rounded-4' src={`https://image.tmdb.org/t/p/w500${details?.profile_path}`} alt="" height={400} />
  </div>

  <div className="col-md-8">
      <h2 className='my-2'>{details?.name}</h2>
      <h3 className='text-dark-emphasis   fs-5'>{details?.place_of_birth}</h3>
      <h4 className='text-dark-emphasis fs-5'>Birthday : {details?.birthday}</h4>
      <p className='text-dark-emphasis lh-3 fw-medium p-2 fs-5'>{details.biography}</p>

<div className='text-center'>
  <h4 >Popularity</h4>
  <h4 className='h5'>{details.popularity} </h4>
</div>

    </div>

  </div>

  {moviesDetails.length>8?<div>
    <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Movie Credits : -</h2>
  <div className="row mx-2 g-3 position-relative ">

  <Slider  {...settings}>
{moviesDetails.map((movie,index)=><MoviesCard media={"movie"} movie={movie} key={index}/>)} 
</Slider></div>
  </div>:null}

</div>
</section>:null}</>:<Loading/>}
          </>
}

export default ActorDetails