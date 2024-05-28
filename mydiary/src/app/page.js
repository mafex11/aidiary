import React from 'react';
import '/globals.css';

function MyApp({ Component, pageProps }) {
  return React.createElement(Component, pageProps);
}

export default MyApp;