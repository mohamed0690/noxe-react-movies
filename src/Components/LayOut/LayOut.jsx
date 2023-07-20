import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function LayOut({ userData, setUserData }) {
  const navigate = useNavigate();

  function logOut() {
    Swal.fire({
      title: "Do you want to continue?",
      icon: "question",
      iconHtml: "؟",
      cancelButtonText: "Yes",
      confirmButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken");
        setUserData(null);
        navigate("/login");
      }
    });
  }

  return (
    <div className="pt-5">
      <Navbar logOut={logOut} setUserData={setUserData} userData={userData} />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
