import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import Logo from "../../../assets/logo.png";
import { useAuthStore } from "../../../store/AuthStore/AuthStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ switchAuth, setSwitchAuth, notify }) => {
  const { LoginOwner } = useAuthStore();
  const [type, setType] = useState(true);
  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("email", e.target[1].value);
    let payload = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    const res = await LoginOwner(payload)
    console.log(res);
    if (res?.status === 200) {
      navigate("/home");
      notify("Logged in")
    }
    sessionStorage.setItem("token", res?.data?.access_token);
    localStorage.setItem("owner_id", res?.data?.owner_id);
  };
  return (
    <div className={switchAuth ? "none" : "login"}>
      <div className="auth__right-top">
        <div className="auth__logo">
          <img src={Logo} alt="" />
        </div>
        <p className="auth__right-title">Welcome to our Restaurant..!</p>
        <div className="auth__right-nav">
          <button
            className="auth__right-active"
            onClick={() => setSwitchAuth(false)}
          >
            Login
          </button>
          <button
            className="auth__right-link"
            onClick={() => setSwitchAuth(true)}
          >
            Register
          </button>
        </div>
      </div>
      <form className="form" onSubmit={Login}>
        <label className="form__title">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </label>
        <div className="form__input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your Email" />
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
      <button className="auth__btn">
        Login
      </button>
      </form>
    </div>
  );
};

export default Login;
