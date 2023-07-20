import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Register({ saveUserData }) {
  const baseurl = "https://ecommerce.routemisr.com/";
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  // **************** handleRegister *******************************
  async function handleRegister(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${baseurl}api/v1/auth/signup`, values);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        saveUserData();
        setIsLoading(false);
        Navigate("/login");
        toast.success("Registration successful! Please login to continue.");
      }
    } catch (error) {
      setMessageError(error.response.data.message);
      setIsLoading(false);
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9!@]{3,16}$/,
        "Password must start with uppercase..."
      ),
    rePassword: Yup.string()
      .required("Re-enter Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="w-100 mx-auto py-5 mb-5">
        <h3>Registration Form:</h3>

        {messageError && (
          <div className="alert alert-danger">{messageError}</div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <label htmlFor="name">Name:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`form-control mt-2 ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              type="text"
              name="name"
              id="name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="email">Email:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`form-control mt-2 ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              type="email"
              name="email"
              id="email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="password">Password:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`form-control mt-2 ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              type="password"
              name="password"
              id="password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="rePassword">Re-enter Password:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              className={`form-control mt-2 ${
                formik.touched.rePassword && formik.errors.rePassword
                  ? "is-invalid"
                  : ""
              }`}
              type="password"
              name="rePassword"
              id="rePassword"
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div className="invalid-feedback">{formik.errors.rePassword}</div>
            )}
          </div>

          <div className="my-3">
            <label htmlFor="phone">Phone:</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={`form-control mt-2 ${
                formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
              }`}
              type="tel"
              name="phone"
              id="phone"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </div>

          {isLoading ? (
            <button className="btn bg-info text-white" type="button" disabled>
              <i className="fas fa-spinner fa-spin me-2"></i>Loading...
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-info text-white"
              type="submit"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
