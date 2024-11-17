// pages/_app.js

import '../styles/global.css'; // O usa 'globals.css' si ese es el nombre correcto


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
