import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

const Layout = ({userData,setUserData}) => {

const navigate = useNavigate()

const removeUserData = ()=>{
  localStorage.removeItem('userToken')
  setUserData(null)
  navigate('login')
}


  return <>
  <Navbar userData={userData} removeUserData={removeUserData}/>
  <Outlet/>
    </>
}

export default Layout