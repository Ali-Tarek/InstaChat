import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { FormContainer } from "../styles/Register.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
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
      const { username, email, password } = values;
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (data.status === false) {
          toast.error(data.message, toastOptions);
        } else if (data.status === true) {
          toast.success("Register successfully", toastOptions);
          localStorage.setItem("insta-chat-user", JSON.stringify(data.newUser));
          setTimeout(() => {
            navigate("/");
          }, 4000);
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
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters long", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email cannot be empty", toastOptions);
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
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />

          <input
            type="email"
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

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />

          <button type="submit">Sign up</button>
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

export default Register;
