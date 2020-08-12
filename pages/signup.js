import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'email': email,
        'password': password,
        'roles': ['ROLE_ADMIN']
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data) {
          //set cookie
          cookie.set('token', data, { expires: 2 });
          Router.push('/');
        }
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Sign Up</p>

      <label htmlFor="username">
        username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          type="text"
        />
      </label>

      <br />

      <label htmlFor="email">
        email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
        />
      </label>

      <br />

      <label htmlFor="password">
        password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
        />
      </label>

      <br />

      <input type="submit" value="Submit" />
      {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
    </form>
  );
};

export default Signup;