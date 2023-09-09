import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet';
const Login = ({saveUserData}) => {

  let navigate =useNavigate()
  const [errorMassage, setErrorMassage] = useState("")
  const [loading, setLoading] = useState(false)
  
  const sendData = async (values) => {
    setLoading(true)
    let {data} =await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin",values)
    .catch((error)=>{
      setLoading(false)
      setErrorMassage(error.response.data.message)
    })
  
    if(data.message==='success'){
      localStorage.setItem("userToken",data.token)
      saveUserData()
      setLoading(false)
      toast.success("successfully Login Welcome Back",{ duration: 3000, position: 'top-center',className: 'bg-success text-white'})
      navigate("/")
    }
  }
  
  
  let validation= Yup.object({
    email:Yup.string().required("Email is required").email("Email invalid"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[a-zA-Z])(?=.*\d).{8}$/,"password min Length is '8' It must contain at least one letter and a number"),
  })
  
    let formik =useFormik({
      initialValues:{
        email:'',
        password:'',
      },
      onSubmit:sendData,
      validationSchema:validation
    })



  return<>
  <Helmet>
  <title>Login</title>
  </Helmet>
<section className="register vh-100 w-100 d-flex justify-content-center align-items-center" >
<div className='bg-dark bg-opacity-75 w-50 p-4 '>
<form onSubmit={formik.handleSubmit}className='p-2'>
<h3 className='text-center'>Login Now</h3>
{errorMassage?<div className='alert alert-danger p-1'>{errorMassage}</div>:null}

<label htmlFor='email' className='fw-bold'>Email :-</label>
<input className='form-control my-2' type="email" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} name='email' id='email' placeholder='Enter your Email'/>
{formik.errors.email && formik.touched.email ?  <div className='text-danger'><ul className='mb-0'><li>{formik.errors.email}</li></ul></div>:null }

<label htmlFor='password' className='fw-bold'>Password :-</label>
<input className='form-control my-2' type="password" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.password} name='password' id='password'  placeholder='Enter your Password'/>
{formik.errors.password && formik.touched.password ?  <div className='text-danger'><ul className='mb-0'><li>{formik.errors.password}</li></ul></div>:null }


<div className='text-end'>
{loading?<button disabled type='button' className='btn btn-primary mt-2' ><i className='fas fa-spinner fa-spin'></i> Login</button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-primary mt-2 ' >Login</button>}
</div>

<div className='text-center mt-2'>Not a member yet ? <Link to="/register" className='text-decoration-none'><span className='text-primary'>Create Account</span> </Link></div>

</form>
</div>
</section>
</>
}

export default Login