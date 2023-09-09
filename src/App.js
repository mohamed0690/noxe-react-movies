import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Movies from "./Components/Movies/Movies";
import Tvshow from "./Components/Tvshow/Tvshow";
import { Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import NotFound from "./Components/NotFound/NotFound";
import Actors from './Components/Actors/Actors';
import Login from './Components/Login/Login';
// import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import {Provider} from "react-redux"
import {store} from './Redux/Store';
import MoviesCard from "./Components/MoviesCard/MoviesCard";
import MovieDetails from './Components/MovieDetails/MovieDetails';
import ActorDetails from './Components/ActorDetails/ActorDetails';
import MovieDiscover from './Components/MovieDiscover/MovieDiscover';
import TvShowDiscover from './Components/TvShowDiscover/TvShowDiscover';
import Search from './Components/Search/Search';
import MovieCard2 from './Components/MovieCard2/MovieCard2';
import MovieDetails2 from './Components/MovieDetails2/MovieDetails2';
const LazyLoading = React.lazy(()=> import("./Components/Home/Home"));


const App = () => {

  useEffect(()=>{
    if(localStorage.getItem("userToken")!==null){
      saveUserData()
    }
  },[])

  const [userData, setUserData] = useState(null)
const saveUserData = () =>{
  let encodedToken = localStorage.getItem("userToken")
  let DecodedToken = jwtDecode(encodedToken)
  setUserData(DecodedToken)
}

  
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData}/>,
      children: [
        { index: true, element:
        <React.Suspense fallback="Loading...">
          <LazyLoading/>
        </React.Suspense> },
        { path: "movieDiscover", element:<MovieDiscover/>},
        { path: "tvShowDiscover", element:<TvShowDiscover/>},
        { path: "movies", element: <Movies/> },
        { path: "tvshow", element: <Tvshow/> },
        { path: "actors", element: <Actors/> },
        { path: "search/:type", element:<Search/>},
        { path: "moviesCard", element:<MoviesCard/> },
        { path: "movieCard2", element:<MovieCard2/> },
        { path: "movieDetails/:id/:media", element:<MovieDetails/> },
        { path: "movieDetails2/:id/:media", element:<MovieDetails2/> },
        { path: "actorDetails/:id/:media", element:<ActorDetails/> },
        { path: "login", element: <Login  saveUserData={saveUserData}/> },
        { path: "register", element:<Register/>},
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

return <>
  <Provider store={store} >
      <Toaster/>
      <RouterProvider router={routers}/>
  </Provider>
</>
};

export default App;
