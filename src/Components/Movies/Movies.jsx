import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { moviesList } from '../../Redux/moviesListSlice'
import { useEffect } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import  ReactPaginate from 'react-paginate'
import $ from "jquery"
import { Helmet } from 'react-helmet'
const Movies = () => {
let dispatch = useDispatch()
const [movies, setMovies] = useState(null)
const [name, setName] = useState("top_rated")

$(".type").click(function(){
  $(this).addClass("active")
  $(this).siblings().removeClass("active")
})



  const getMovies = async(mediaItem,page)=>{
    let movies = await dispatch(moviesList({mediaItem,page}))
    setMovies(movies.payload)
  }
  async function handlePageClick(data){
    let page = data?.selected+1
    getMovies(name,page)
  }

  useEffect(()=>{
    getMovies("top_rated",1)
  },[])

  return <>
<Helmet>
<title>Movies</title>
</Helmet>
  {movies?<section>
<div className="container-fluid px-5 py-5 ">
  <div className="row my-5  position-relative">
    <div className='d-flex justify-content-center align-items-center mb-2'>
      <button onClick={()=>getMovies("top_rated",setName("top_rated"))} className=' btn p-2 type text-white  active'>Top Rated</button>
      <button onClick={()=>getMovies("popular",setName("popular"))} className=' btn p-2 type text-white '>Popular</button>
      <button onClick={()=>getMovies("now_playing",setName("now_playing"))} className=' btn p-2 type text-white '>Now Playing</button>
      <button onClick={()=>getMovies("upcoming",setName("upcoming"))} className=' btn p-2 type text-white '>Up Coming</button>
    </div>

    {movies.total_pages>5?<ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        breakLinkClassName='page-link'
        pageCount={50}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        containerClassName='pagination justify-content-center'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        activeClassName='active'
      />:null}

<div className="row mx-2 g-3 position-relative ">
{movies.results.map((movie,index)=><MoviesCard media={"movie"} movie={movie} key={index}/>)} 
</div>
  </div>
</div>
</section>:null}

    </>
}

export default Movies