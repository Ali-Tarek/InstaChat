import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { FormContainer } from "../styles/Register.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("insta-chat-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { email, password } = values;
      try {
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });

        if (data.status === false) {
          toast.error(data.message, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem("insta-chat-user", JSON.stringify(data.user));
          navigate("/");
        }
      } catch (error) {

        if (error.response) {
          toast.error(`Error: ${error.response.data.message}`, toastOptions);
        } else if (error.request) {
          toast.error("Network error, please try again later.", toastOptions);
        } else {
          toast.error("Error:", error.message, toastOptions);
        }
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { email, password } = values;

    if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>InstaChat</h1>
          </div>

          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <button type="submit">Sign in</button>
          <span>
            Don't have an account? <Link to="/register">Sign up</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

export default Login;
