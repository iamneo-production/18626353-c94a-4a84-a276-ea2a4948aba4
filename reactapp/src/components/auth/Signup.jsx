import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Buffer from './Buffer';

const Signup = ({ handleSignup }) => {
  const [userRole, setUserRole] = useState('');
  const [SelectErrorr, setSelectErrorr] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async () => {
    setIsLoading(true);

    try {
      // Simulate a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
      username,
      mobile,
      userRole
    };

    let endpoint = '';

    if (userRole === 'user') {
      endpoint = 'http://localhost:5155/api/user/signup';
    } else if (userRole === 'admin') {
      endpoint = 'http://localhost:5155/api/admin/signup';
    }

    try {
      setIsLoading(true);

      const res = axios.post(endpoint, user);
      console.log(res.data);

      // Simulate a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectErrorr('');
    setUsername('');
    setUsernameError('');
    setMobile('');
    setMobileError('');
    setEmail('');
    setEmailError('');
    setPassword('');
    setPasswordError('');
    setConfirmPassword('');
    setConfirmPasswordError('');
  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
    if (event.target.value === 'admin' || event.target.value === 'user') {
      setSelectErrorr("");
      resetForm();
    } else {
      setSelectErrorr("Select any one");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (!event.target.value) {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    if (!/^[6-9]\d{9}$/.test(event.target.value)) {
      if (!/^\d{10}/.test(event.target.value)) {
        setMobileError("Mobile number must be 10 digits");
      } else {
        setMobileError("Wrong mobile number");
      }
    } else {
      setMobileError("");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(event.target.value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!/[a-zA-Z0-9@_]{8,}/.test(event.target.value)) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-heading">SIGN UP</h1>
          <br></br>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div id='bgclr'>
              <select value={userRole} onChange={handleUserRoleChange} className="select-role">
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className='error'>{SelectErrorr}</div>
              <br />
              {(userRole === 'user' || userRole === 'admin') && (
                <div className="form">
                  <input type='text' id="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
                  <div className="error">{emailError}</div>

                  <input id="username" value={username} onChange={handleUsernameChange} type='text' placeholder="Enter Username" />
                  <div className="error">{usernameError}</div>

                  <input id="mobileNumber" value={mobile} onChange={handleMobileChange} placeholder="Enter Mobilenumber" />
                  <div className="error">{mobileError}</div>

                  <input id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                  <div className="error">{passwordError}</div>

                  <input id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} type="password" placeholder="Confirm Password" />
                  <div className='error'>{confirmPasswordError}</div>
                </div>
              )}

              <button id="submitButton" type='submit' disabled={!userRole || usernameError || emailError || mobileError || passwordError || confirmPasswordError}>
                REGISTER
              </button>
              <label className='label' style={{ color: "#f4ecec" }}>
                Already User/Admin?{' '}<button className="link-btn" id="loginButton" onClick={handleSignin}>
                  SIGN IN
                </button>
              </label>

            </div>
          </form>
        </div>
      </div>
      {isLoading && <Buffer />}
    </div>
  );
};

export default Signup;
