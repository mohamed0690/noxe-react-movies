import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const API_BASE_URL = 'https://ecommerce.routemisr.com/';

export default function Login({ saveUserData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API_BASE_URL}api/v1/auth/signin`, values);
      if (data?.message === 'success') {
        localStorage.setItem('userToken', data.token);
        saveUserData();
        navigate('/');
      } else {
        throw new Error(data?.message || 'An error occurred while logging in.');
      }
    } catch (error) {
      setMessageError(error?.response?.data?.message || 'An error occurred while logging in.');
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z][a-z0-9!@]{3,16}$/, 'Password must start with an uppercase letter...'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 mx-auto py-5">
        <h3>Login Now:</h3>

        {messageError && <div className="alert alert-danger">{messageError}</div>}

        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <label htmlFor="email">Email:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className='form-control mt-2'
              type="email"
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className='alert alert-danger'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="my-3">
            <label htmlFor="password">Password:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className='form-control mt-2 '
              type="password"
              name="password"
              id="password"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className='alert alert-danger'>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="text-center">
            <button
              disabled={!formik.isValid || !formik.dirty || isLoading}
              className='btn bg-info text-white'
              type='submit'
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
