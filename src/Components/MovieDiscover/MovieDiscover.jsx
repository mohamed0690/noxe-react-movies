import React, { useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import  ReactPaginate from 'react-paginate';
import { moviesGenre, moviesSortedBy } from './../../Redux/MoviesSortedBySlice';
import { Helmet } from 'react-helmet';


const MovieDiscover = () => {

  let dispatch = useDispatch()
  const [movies, setMovies] = useState(null)
  const [name, setName] = useState(null)

    const getMovies = async(mediaItem,page)=>{
      let movies = await dispatch(moviesSortedBy({mediaItem,page}))
      setMovies(movies.payload)
      setName(mediaItem)
    }

    const getMoviesGenres = async(id,page)=>{
      let movies = await dispatch(moviesGenre({id,page}))
      setMovies(movies.payload)
      setName(Number(id))
    }
    async function handlePageClick(data){
      let page = data?.selected+1
      typeof(name)==="number"?getMoviesGenres(name,page):getMovies(name,page)
    }
  

    const selectValue=()=>{
      let sort = document.querySelector("#sort").value
      getMovies(sort,1)
    }

    const selectValue2=()=>{
      let Genres = document.querySelector("#Genres").value
      getMoviesGenres(Genres,1)
    }

    useEffect(()=>{
      getMovies("vote_count",1)
    },[])


  return <>
    <Helmet>
<title>Movie Discover</title>
</Helmet>
{movies?<section>
<div className="container px-5 py-5 ">
  <div className="row my-5  position-relative">
    <div className="col-md-2 mt-5 mb-3 col-12">
            <select id="sort" name='sort' className="form-select mt-5 w-100"  onChange={()=>selectValue()}>
            <option  hidden >Sort By</option>
            <option value={"vote_count"} >Vote Count</option>
            <option value={"revenue"} >Revenue</option>
            <option value={"popularity"} >Popularity</option>
            <option value={"release_date"} >Release Date</option>
            <option value={"primary_release_date"} >Primary Release Date</option>
            <option value={"vote_average"} >Vote Average</option>
            </select>

            <select id="Genres" name='Genres' className="form-select mt-3 w-100" onChange={()=>selectValue2()}>
            <option hidden >Genres</option>
            <option value={28} >Action</option>
            <option value={12} >Adventure </option>
            <option value={16} >Animation </option>
            <option value={35} >Comedy</option>
            <option value={80} >Crime</option>
            <option value={99} >Documentary</option>
            <option value={18} >Drama </option>
            <option value={10751} >Family</option>
            <option value={14} >Fantasy</option>
            <option value={36} >History</option>
            <option value={27} >Horror</option>
            <option value={10402} >Music</option>
            <option value={9648} >Mystery</option>
            <option value={10749} >Romance</option>
            <option value={878} >Science Fiction</option>
            <option value={10770} >TV Movie</option>
            <option value={53} >Thriller</option>
            <option value={10752} >War</option>
            <option value={37} >Western</option>
            </select>
    </div>
    <div className="col-md-10">
    {movies.total_pages>5?<ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        breakLinkClassName='page-link'
        pageCount={10}
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
</div>
</section>:null}
    </>
}

export default MovieDiscover