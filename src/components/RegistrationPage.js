import React, { useState } from 'react';

const RegistrationPage = () => {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const handleRegister = async () => {
    if (inputName.trim() !== '') {
      try {
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: inputName }),
        });

        const data = await response.json();
        if (response.ok) {
          setName(inputName);
          setRegistered(true);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please check the console for more details.');
      }
    } else {
      alert('Please enter your name to register.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Welcome, ${name}!`);
  };

  return (
    <div>
      {registered ? (
        <div>
          <h1>Registration Successful, {name}!</h1>
        </div>
      ) : (
        <div>
          <h1>Registration Page</h1>
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
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
