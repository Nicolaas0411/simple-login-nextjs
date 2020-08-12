import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';
import { useRouter } from 'next/router'

function Home() {
  let loggedIn = false;
  const router = useRouter();

  const { data, revalidate } = useSWR('http://localhost:8080/users/me', async function (args) {
    const res = await fetch(args, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookie.get('token')
      }
    });
    if (res.status == 403) {
      router.push('/login')
    }
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <h1>Simplest login</h1>

        <h2>You are now authenticated!</h2>
        {loggedIn && (
          <>
            <p>Welcome {data.email}!</p>
            <button
              onClick={() => {
                cookie.remove('token');
                revalidate();
              }}>
              Logout
          </button>
          </>
      )}
      {!loggedIn && (
        <>
          <Link href="/login">Login</Link>
          <p>or</p>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}

export default Home;
