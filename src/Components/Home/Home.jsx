import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Trending } from '../../Redux/trendingMoviesSlice'
import { tvSeries } from '../../Redux/tvShowSlice'
import { moviesList } from '../../Redux/moviesListSlice'
import MoviesCard from '../MoviesCard/MoviesCard'
import Slider from "react-slick"
import { Link } from 'react-router-dom';
import ActorCard from '../ActorCard/ActorCard'
import { Helmet } from 'react-helmet'
import Loading from './../Loading/Loading';

const Home = () => {
 let {loading}=useSelector((state)=>state.trending)
 console.log(loading);
let dispatch = useDispatch()
const [number, setNumber] = useState("1")
const [movies, setMovies] = useState([])
const [person , setPerson] = useState([])
const [tvShow, setTvShow] = useState([])
const [airingToday, setAiringToday] = useState([])
const [onTheAir, setOnTheAir] = useState([])
const [popular, setPopular] = useState([])
const [topRated, setTopRated] = useState([])
const [nowPlaying, setNowPlaying] = useState([])
const [popularMovie, setPopularMovie] = useState([])
const [topRatedMovie, setTopRatedMovie] = useState([])
const [upcoming, setUpcoming] = useState([])

const getMoviesHere = async (mediaItem,callback,page)=>{
let elements = await dispatch(Trending({mediaItem,page}))
callback(elements.payload.results)

}


const getTvSeries = async (mediaItem,callback)=>{
  let elements = await dispatch(tvSeries({mediaItem}))
  callback(elements.payload.results)

}

const getMoviesList =async (mediaItem,callback)=>{
let elements = await dispatch(moviesList({mediaItem}))
callback(elements.payload.results)

}


useEffect(()=>{
  getMoviesHere("movie",setMovies,number)
  getMoviesHere("tv",setTvShow,number)
  getMoviesHere("person",setPerson,number)
  getTvSeries("airing_today",setAiringToday)
  getTvSeries("on_the_air",setOnTheAir)
  getTvSeries("popular",setPopular)
  getTvSeries("top_rated",setTopRated)
  getMoviesList("now_playing",setNowPlaying)
  getMoviesList("popular",setPopularMovie)
  getMoviesList("top_rated",setTopRatedMovie)
  getMoviesList("upcoming",setUpcoming)
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

const settings2  = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: true,

};

  return <>
<Helmet>
<title>Home</title>
</Helmet>
{!loading?

  <section>

  <Slider  {...settings2}>
    {movies.map((movie,index)=><div key={index} className='position-relative'>
      <img  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="w-100 background" />
      <div className="layer d-flex flex-column justify-content-center align-items-start ps-5 pb-5">
          <p className='ps-5 fw-bolder  display-5'>Watch Free Movies </p>
          <span className='ps-5  display-5  fw-bolder'>With <span className='text-info'>N</span>oxe . </span>
          <span className='ps-5 fs-4 pt-4'>Stop searching for free movie websites and watch </span>
          <span className='ps-5 fs-4 pb-4'>Noxe now.</span>

      </div>
    </div>
)}

</Slider>



  <h2 className='h3 mb-3 mt-4 ps-5 fst-italic'>Trending Movies This Week : -</h2>


  <Slider  {...settings} >
{movies.map((movie,index)=><MoviesCard media={"movie"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/movies">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Popular Movies : -</h2>

  <Slider  {...settings}>
{popularMovie.map((movie,index)=><MoviesCard media={"movie"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/movies">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>




  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>NowPlaying Movies : -</h2>

  <Slider  {...settings}>
{nowPlaying.map((movie,index)=><MoviesCard media={"movie"} nowPlaying={nowPlaying} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/movies">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Upcoming Movies : -</h2>

  <Slider  {...settings}>
{upcoming.map((movie,index)=><MoviesCard media={"movie"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/movies">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>TopRatedMovie Movies : -</h2>

  <Slider  {...settings}>
{topRatedMovie.map((movie,index)=><MoviesCard media={"movie"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/movies">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Trending Tv Show This Week : -</h2>

  <Slider  {...settings}>
{tvShow.map((movie,index)=><MoviesCard media={"tv"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/movies">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Airing Today Tv Shows : -</h2>
  <Slider  {...settings}>
{airingToday.map((movie,index)=><MoviesCard media={"tv"} movie={movie} key={index}/>)} 
</Slider>

  <Link to="/tvshow">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>On The Air Tv Shows : -</h2>

  <Slider  {...settings}>
{onTheAir.map((movie,index)=><MoviesCard media={"tv"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/tvshow">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Popular Tv Shows: -</h2>

  <Slider  {...settings}>
{popular.map((movie,index)=><MoviesCard media={"tv"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/tvshow">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Top Rated Tv Shows : -</h2>

  <Slider  {...settings}>
{topRated.map((movie,index)=><MoviesCard media={"tv"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/tvshow">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  <h2 className='h3 mb-3 mt-3 ps-5 fst-italic'>Movie Actors : -</h2>

  <Slider  {...settings} >
{person.map((movie,index)=><ActorCard media={"person"} movie={movie} key={index}/>)} 
</Slider>


  <Link to="/actors">
  <div className='text-center details my-2 text-white'>
  <i className="fa-solid fa-chevron-down fs-2"></i>
  </div>
  </Link>



  </section>:<Loading/>}


    </>
}

export default Home





{/* <button className='btn btn-danger' onClick={getImage} >click here</button>

{imageBlob?<figure>
  <img src={`data:image/jpeg;base64,${imageBlob}`} alt=""/>
</figure>:null} */}

{/* {`data:image/jpeg;base64, ${imageBase64}`} */}





// const [imageBlob, setImageBlob] = useState(null)

// const getImage =async (values) =>{
//   let {data} = await axios.post(`http://aitsp.co:9024/user/login/`,{
//     username:"ahmedgamal",
//     password:"Ahmed@123456789"
//   })
//   console.log(data);
//   console.log(data.user_img);
// //   let reader = new FileReader();
// // reader.readAsDataURL(data.user_img);
//   setImageBlob(data.user_img)
//   console.log(imageBlob)
// }