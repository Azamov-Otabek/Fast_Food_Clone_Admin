import React, { useEffect, useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuthStore } from "../../../store/AuthStore/AuthStore";
const Verification = () => {
  const [type, setType] = useState(true);
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  useEffect(()=> {
    let email = sessionStorage.getItem("email")
    setEmail(email)
  },[])
  const {VerifyOwner} = useAuthStore()
  const Verify = async(e) => {
    e.preventDefault()
    let email = JSON.parse(localStorage.getItem("email"))
    let code = e.target[0].value
    const res = await VerifyOwner(email, code)
    console.log(res);
    sessionStorage.setItem("token", res?.data?.access_token)
    if (res?.status === 200) {
        toast.success("Successfully verified!")
        navigate("/home")
    }else {
        toast.error("Code has expired")
    }
  };
  return (
    <div className="verify__container">
      <ToastContainer />
      <div className="verify">
        <form className="form" onSubmit={Verify}>
          <label className="form__title">
            Verification code sent to your email
          </label>
          <div className="form__input">
            <IoEyeOff
              className={type ? "auth__eye" : "none"}
              onClick={() => setType((prev) => !prev)}
            />
            <IoEye
              className={type ? "none" : "auth__eye"}
              onClick={() => setType((prev) => !prev)}
            />
            <label htmlFor="Code">Code</label>
            <input
              type={type ? "password" : "text"}
              id="Code"
              placeholder="Enter your Code"
            />
          </div>
          <div className="login__bottom">
            <Link
              to={`https://mail.google.com/mail/u/0/#inbox/${email}`}
              className="login__forgot"
            >
              Click to verify
            </Link>
          </div>
          <button className="auth__btn" type="submit">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
