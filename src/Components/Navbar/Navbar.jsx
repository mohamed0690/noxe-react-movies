import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from "jquery"

const Navbar = ({userData,removeUserData}) => {
let navigate = useNavigate()

const searching = (event)=>{
  navigate(`/search/${event.target.value?event.target.value:"movie"}`)
}

$(".nav-link").click(function(){
  $(this).addClass("active")
  $(this).parent().siblings().children().removeClass("active")
})


  return <>
    <nav className="navbar navbar-expand-sm px-5 fixed-top">
      <div className="container align-items-center">
        <Link className="navbar-brand text-white fs-2 " to="/"><span className='text-info fw-bold'>N</span>oxe</Link>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse  " id="collapsibleNavId">
          <ul className="navbar-nav me-auto  mt-lg-0 d-flex align-items-center  ">

    <li className="nav-item">
              <Link className="nav-link here active" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
          <Link className="nav-link here dropdown-toggle" to="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Discover</Link>
          <div className="dropdown-menu" aria-labelledby="dropdownId">
            <Link className="dropdown-item" to="movieDiscover">Movie</Link>
            <Link className="dropdown-item" to="tvShowDiscover">Tv Show</Link>
          </div>
        </li>
            <li className="nav-item">
              <Link className="nav-link here" to="movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link here" to="tvshow">TvShow</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link here" to="actors">Actors</Link>
            </li>

          </ul>
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">

        <li className="nav-item">
          <input type="search" onChange={searching} width={50} placeholder="Search By Movie Name" aria-label="Search" className="form-control me-2"/>
        </li>
    {userData? <>
          <li className="nav-item">
              <button className='btn btn-outline-info ms-3' onClick={()=>removeUserData()}>LogOut</button>
            </li></>
            :<>
            <li className="nav-item">
              <Link className="nav-link" to="login">
                <button className='btn btn-outline-info'>Login</button>
                </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="register">
              <button className='btn btn-outline-info'>Register</button>
              </Link>
            </li>
            </>}
          </ul>
        </div>
        </div>
    </nav>
    
    </>
}

export default Navbar