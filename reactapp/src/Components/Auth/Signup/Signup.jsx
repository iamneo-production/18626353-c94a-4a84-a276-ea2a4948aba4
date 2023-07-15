import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Buffer from '../Buffer/Buffer';
import Alert from '@mui/material/Alert';

const Signup = ({ handleSignup }) => {
    const [userRole, setUserRole] = useState('user');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [mobileNumber, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignin = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const user = {
          email,
          password,
          username,
          mobileNumber,
          userRole,
        };
      
        const endpoint = 'https://8080-abbaedcbbaecebadafdecbf.project.examly.io/user/signup';
      
        try {
          setIsLoading(true);
          setIsSuccess(false);
          setError('');
      
          await axios.post(endpoint, user);
          setIsSuccess(true);
          setError('');
          setIsLoading(false);
      
          setTimeout(() => {
            setIsLoading(false);
            navigate('/');
          }, 1500);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setError('Failed to add user. Please try again.');
        }
      };
    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(value ? '' : 'Username is required');
    };

    const handleMobileChange = (event) => {
        const value = event.target.value;
        setMobile(value);
        setMobileError(/^\d{10}$/.test(value) ? '' : 'Mobile number must be 10 digits');
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(value) ? '' : 'Email is not valid');
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordError(/[a-zA-Z0-9@_]{8,}/.test(value) ? '' : 'Password must be at least 8 characters');
    };

    const handleConfirmPasswordChange = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value === password ? '' : 'Passwords do not match');
    };

    const handleRoleChange = (event) => {
        setUserRole(event.target.value);
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-card">
                    <h1 className="signup-heading">SIGN UP</h1>
                    <br></br>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        {isSuccess && (
                            <Alert className="success-alert" variant="filled" severity="success">
                                User added successfully
                            </Alert>
                        )}
                        {error && (
                            <Alert className="error-alert" variant="filled" severity="error">
                                {error}
                            </Alert>
                        )}
                        <div id="bgclr">
                            <div className="form">
                                <select id="userRole" value={userRole} onChange={handleRoleChange}>
                                    <option value="user">User</option>
                                </select>

                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter email"
                                />
                                {emailError && <div className="error">{emailError}</div>}

                                <input
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    type="text"
                                    placeholder="Enter Username"
                                />
                                {usernameError && <div className="error">{usernameError}</div>}

                                <input
                                    id="mobileNumber"
                                    value={mobileNumber}
                                    onChange={handleMobileChange}
                                    placeholder="Enter Mobilenumber"
                                />
                                {mobileError && <div className="error">{mobileError}</div>}
                                <input id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                                <div className="error">{passwordError}</div>

                                <input id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} type="password" placeholder="Confirm Password" />
                                <div className="error">{confirmPasswordError}</div>
                            </div>

                            <button
                                id="submitButton"
                                type="submit"
                                disabled={usernameError || emailError || mobileError || passwordError || confirmPasswordError || isLoading}
                            >
                                {isLoading ? <Buffer /> : 'REGISTER'}
                            </button>
                            <label className="label" style={{ color: '#f4ecec' }}>
                                Already User?{' '}
                                <button className="link-btn" id="loginButton" onClick={handleSignin}>
                                    SIGN IN
                                </button>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;