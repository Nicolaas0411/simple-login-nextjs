import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Link from 'next/link';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch(`http://localhost:8080/users/signin?password=${password}&username=${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((r) => {
      return r.text();
    }).then((data) => {
      if (data && data.error) {
        setLoginError(data.message);
      }
      if (data) {
        //set cookie
        cookie.set('token', data, { expires: 2 });
        Router.push('/');
      }
    })
  }
  return (
    <div>
       <form onSubmit={handleSubmit}>
      <p>Login</p>

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
    </form>
      <Link href="/signup"><a title="Signup">Sign up</a></Link>
    </div>
  );
};

export default Login;
