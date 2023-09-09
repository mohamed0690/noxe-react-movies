import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet';

const Register = () => {
let navigate =useNavigate()
const [errorMassage, setErrorMassage] = useState("")
const [loading, setLoading] = useState(false)

const sendData = async (values) => {
  setLoading(true)
  let {data} =await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",values)
  .catch((error)=>{
    setLoading(false)
    setErrorMassage(error.response.data.message)
  })

  if(data.message==='success'){

    setLoading(false)
    toast.success("Your registration has been successful",{ duration: 3000, position: 'top-center',className: 'bg-success text-white'})
    navigate("/login")
  }
}


let validation= Yup.object({
  name:Yup.string().required("Username is required").min(3,'Username minLength is 3').max(20,"userName maxLength is 20"),
  email:Yup.string().required("Email is required").email("Email invalid"),
  password:Yup.string().required("Password is required").matches(/^(?=.*[a-zA-Z])(?=.*\d).{8}$/,"password min Length is '8' It must contain at least one letter and a number"),
  rePassword:Yup.string().required("rePassword is required").oneOf([Yup.ref("password")] ,"rePassword don't match "),
  phone:Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/,"phone number must be egyptian number")
})

  let formik =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    onSubmit:sendData,
    validationSchema:validation
  })


  return <>
                <Helmet>
        <title>Register</title>
        </Helmet>
<section className="register vh-100 w-100 d-flex justify-content-center align-items-center" >
  <div className='bg-dark bg-opacity-75 w-50 p-4 '>
<form onSubmit={formik.handleSubmit}className='p-2'>
<h3 className='text-center'>Register Now</h3>
{errorMassage?<div className='alert alert-danger p-1'>{errorMassage}</div>:null}
  <label htmlFor='name' className='fw-bold'>User Name :-</label>
  <input className='form-control my-2' type="text" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.name} name='name' id='name' placeholder='Enter your Name'/>
  {formik.errors.name && formik.touched.name ?  <div className='text-danger'><ul className='mb-0'><li>{formik.errors.name}</li></ul></div>:null }

  <label htmlFor='email' className='fw-bold'>Email :-</label>
  <input className='form-control my-2' type="email" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} name='email' id='email' placeholder='Enter your Email'/>
  {formik.errors.email && formik.touched.email ?  <div className='text-danger'><ul className='mb-0'><li>{formik.errors.email}</li></ul></div>:null }

  <label htmlFor='password' className='fw-bold'>Password :-</label>
  <input className='form-control my-2' type="password" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.password} name='password' id='password'  placeholder='Enter your Password'/>
  {formik.errors.password && formik.touched.password ?  <div className='text-danger'><ul className='mb-0'><li>{formik.errors.password}</li></ul></div>:null }

  <label htmlFor='rePassword' className='fw-bold'>rePassword :-</label>
  <input className='form-control my-2' type="password" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' id='rePassword'  placeholder='Enter your RePassword'/>
  {formik.errors.rePassword && formik.touched.rePassword ?  <div className='text-danger'><ul className='mb-0'><li>{formik.errors.rePassword}</li></ul></div>:null }

  <label htmlFor='phone' className='fw-bold'>Phone :-</label>
  <input className='form-control my-2' type="tel" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.phone} name='phone' id='phone' placeholder='Enter your PhoneNumber' />
  {formik.errors.phone && formik.touched.phone ?  <div className='text-danger'><ul className='mb-0'><li>{formik.errors.phone}</li></ul></div>:null }
<div className='text-end'>
{loading?<button disabled type='button' className='btn btn-primary mt-2' ><i className='fas fa-spinner fa-spin'></i> Register</button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-primary mt-2 ' >Register</button>}
</div>

<div className='text-center mt-2'>Already a member ? <Link to="/login" className='text-decoration-none'><span className='text-primary'>LogIn</span> </Link></div>

</form>
  </div>
</section>
    </>
}

export default Register