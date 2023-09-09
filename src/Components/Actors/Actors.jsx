import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import  ReactPaginate from 'react-paginate';
import { Trending } from './../../Redux/trendingMoviesSlice';
import ActorCard from '../ActorCard/ActorCard';
import { Helmet } from 'react-helmet';
const Actors = () => {

  let dispatch = useDispatch()
  const [movies, setMovies] = useState(null)
  
    const getMovies = async(mediaItem,page)=>{
      let movies = await dispatch(Trending({mediaItem,page}))

      setMovies(movies.payload)
    }
    async function handlePageClick(data){
      let page = data?.selected+1
      getMovies("person",page)
    }
  
    useEffect(()=>{
      getMovies("person",1)
    },[])

  return <>
  <Helmet>
<title>Actors</title>
</Helmet>
  {movies?<section>
<div className="container-fluid px-5 py-5 ">
  <div className="row my-5  position-relative">
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
{movies.results.map((movie,index)=><ActorCard media={"person"} movie={movie} key={index}/>)} 
</div>
  </div>
</div>
</section>:null}
    </>
}

export default Actors