import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const handleLogin = async () => {
    if (inputName.trim() !== '') {
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: inputName }),
        });

        const data = await response.json();
        if (response.ok && data.user) {
          setName(inputName);
          setLoggedIn(true);
        } else {
          alert('User not found');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check the console for more details.');
      }
    } else {
      alert('Please enter your name to log in.');
    }
  };

  const handleLogout = () => {
    setName('');
    setInputName('');
    setLoggedIn(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Welcome, ${name}!`);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome back, {name}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Fitness Tracker</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Please enter your name:
              <input
                type="text"
                value={inputName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </form>
          <div>
            <Link to="/register">New User? Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
