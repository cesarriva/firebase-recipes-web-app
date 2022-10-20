import React, { useState } from 'react';
import AuthService from '../FirebaseAuthService';

const LoginForm = ({ existingUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AuthService.loginUser(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logoutUser();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      return alert('Missing email!');
    }

    try {
      await AuthService.sendPasswordResetEmail(email);
      alert('Email to reset password sent successfully.');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await AuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='login-form-container'>
      {existingUser ? (
        <div className='row'>
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type='button'
            className='primary-button'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='login-form'>
          <label className='input-label login-label'>
            Email:
            <input
              type='email'
              className='input-text'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className='input-label login-label'>
            Password:
            <input
              type='password'
              className='input-text'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className='button-box'>
            <button className='primary-button'>Login</button>
            <button
              type='button'
              className='primary-button'
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            <button
              type='button'
              className='primary-button'
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
