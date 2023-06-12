import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import './Login.css';
import axios from "axios";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import Buffer from './Buffer';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const validateForm = () => {
    const errors = {};
    // Validate email field
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    // Validate password field
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    setErrorMessage(errors); // Update the state with errors

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleSignup = () => {
    setIsLoading(true);


    setTimeout(() => {
      setIsLoading(false);
      navigate('/Signup');
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let auth = {
        isAuth: false,
        role: null
      };

      const data = { email: email, password: password };

      axios.post('http://localhost:5155/api/user/login', data)
        .then((result) => {
          if (result.data === true) {
            auth.isAuth = result.data;
            auth.role = "User";
            Auth(auth);
            navigate('/user/Viewacademy');
          }
        }).catch((error) => {
          console.log(error);
        });

      axios.post('http://localhost:5155/api/admin/login', data)
        .then((result) => {
          if (result.data === true) {
            auth.isAuth = true;
            auth.role = "Admin";
            Auth(auth);
            navigate('/admin/Adminacademy');
          }
        }).catch((error) => {
          console.log(error);
        });
    } else {
      console.log('Form contains errors. Please fix them before submitting.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-heading">SIGN IN</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} style={{ color: "#f4ecec" }} />
              <input
                type="text"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
              {errorMessage.email && <span className="error">{errorMessage.email}</span>}
            </div>

            <div className="input-field">
              <FontAwesomeIcon icon={faKey} style={{ color: "#f4ecec" }} />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {errorMessage.password && <span className="error">{errorMessage.password}</span>}
            </div>
            <br />
            <button type="submit" id="loginButton">
              LOGIN
            </button>
            <br></br>
          </form>

          <div className="container-class">
          <br></br>
            <label className="link-text" style={{ color: "#f4ecec" }}>
              New User/Admin?{' '}
            </label>
            {isLoading ? (
              <div className="loading-screen">
                <div className="buffering-symbol"></div>
              </div>
            ) : (
              <button className="link-btn" id="signupLink" onClick={handleSignup}>
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
      {isLoading && <Buffer />}
    </div>
  );
};

export default Login;
