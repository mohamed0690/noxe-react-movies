import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import People from './Components/People/People';
import TvShow from './Components/TvShow/TvShow';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/Notfound.jsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

export default function App() {

  const [userData, setUserData] = useState(null);


  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwt_decode(encodedToken);
    setUserData(decodedToken);
  }


  let routers = createHashRouter([
    {
      path: "", element: <LayOut setUserData={setUserData} userData={userData} />, children: [
        { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "movies", element: <ProtectedRoute> <Movies /> </ProtectedRoute> },
        { path: "moviedetails/:id/:mediaType", element: <ProtectedRoute> <MovieDetails /> </ProtectedRoute> },
        { path: "people", element: <ProtectedRoute> <People /> </ProtectedRoute> },
        { path: "tvShow", element: <ProtectedRoute> <TvShow /> </ProtectedRoute> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register saveUserData={saveUserData} /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ]);

  return <>
    <RouterProvider router={routers}></RouterProvider>
    <Toaster />
  </>

}