import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import './Login.css';
import axios from "axios";
import Auth from '../auth/Auth';
import { useNavigate } from "react-router-dom";
import Buffer from '../Buffer/Buffer';
import Alert from '@mui/material/Alert';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Function to validate form inputs
  const validateForm = () => {
    const errors = {};
  
    const validateField = (fieldName, value) => {
      if (!value.trim()) {
        errors[fieldName] = `${fieldName} is required`;
      }
    };
  
    const validateEmail = (fieldName, value) => {
      validateField(fieldName, value);
      if (!errors[fieldName] && !/^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[com]{3,}$/.test(value)) {
        errors[fieldName] = 'Email is invalid';
      }
    };
  
    validateEmail('email', email);
    validateField('password', password);
  
    setErrorMessage(errors); // Update the state with errors
  
    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };
  

  // Handle sign up button click
  const handleSignup = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/Signup');
    }, 500);
  };

  // Function to handle user login and admin login
  const loginUser = async (url, role) => {
    try {
      const response = await axios.post(url, { email, password });

      setIsLoading(false);

      if (response.data === true) {
        const auth = {
          isAuth: true,
          role,
        };
        Auth(auth);
        localStorage.setItem('email', email);
        if (role === 'User') {
          navigate('/user/userhome');
        } else if (role === 'Admin') {
          navigate('/admin/adminacademy');
        }
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setLoginError('Failed to login. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      const userLoginUrl = 'https://8080-ebfcaeccbabbaecebadafdecbf.project.examly.io/user/loginby22';
      const adminLoginUrl = 'https://8080-ebfcaeccbabbaecebadafdecbf.project.examly.io/admin/login';

      await Promise.all([
        loginUser(userLoginUrl, 'User'), // Login user
        loginUser(adminLoginUrl, 'Admin'), // Login admin
      ]);
    } else {
      console.log('Form contains errors. Please fix them before submitting.');
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-heading">Boxing Nexus</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            {loginError && (
              <Alert className="error-alert" variant="filled" severity="error">
                {loginError}
              </Alert>
            )}
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
