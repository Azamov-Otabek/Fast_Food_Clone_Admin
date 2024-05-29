import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import Logo from "../../../assets/logo.png";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthStore } from "../../../store/AuthStore/AuthStore";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Register = ({ switchAuth, setSwitchAuth }) => {
  const {RegisterOwner} = useAuthStore()
  const [type, setType] = useState(true);
  const handleFileChange = (event) => {
    let image = event.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
  };
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    sessionStorage.setItem("email", e.target[1].value)
    let payload = {
      avatar: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      full_name: e.target[0].value,
      email: e.target[1].value,
      company_name: e.target[2].value,
      password: e.target[3].value,
      tax: 2,
    };
    const res = await RegisterOwner(payload)
    console.log(res)
    if (res?.status === 200) {
      navigate("/verify")
    }
  };
  return (
    <div className={switchAuth ? "login" : "none"}>
      <ToastContainer />
      <div className="auth__right-top">
        <div className="auth__logo">
          <img src={Logo} alt="" />
        </div>
        <p className="auth__right-title">Welcome to our Restaurant..!</p>
        <div className="auth__right-nav">
          <button
            className="auth__right-link"
            onClick={() => setSwitchAuth(false)}
          >
            Login
          </button>
          <button
            className="auth__right-active"
            onClick={() => setSwitchAuth(true)}
          >
            Register
          </button>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {/* <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          className="form__avatar"
        >
          Upload avatar
          <VisuallyHiddenInput type="file" />
        </Button> */}
        <div className="form__input">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            placeholder="Enter your Full Name"
          />
        </div>
        <div className="form__input">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your Email Address"
          />
        </div>
        <div className="form__input">
          <label htmlFor="company">Company name</label>
          <input
            type="text"
            id="company"
            placeholder="Enter your Company name"
          />
        </div>
        <div className="form__input">
          <IoEyeOff
            className={type ? "auth__eye" : "none"}
            onClick={() => setType((prev) => !prev)}
          />
          <IoEye
            className={type ? "none" : "auth__eye"}
            onClick={() => setType((prev) => !prev)}
          />
          <label htmlFor="password">Password</label>
          <input
            type={type ? "password" : "text"}
            id="password"
            placeholder="Enter your Password"
          />
        </div>
        <button className="auth__btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
