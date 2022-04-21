import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import Header from '../components/Header/Header.container';
import 'antd/dist/antd.css';
// import '../styles/globals.css';
import '../scss/index.scss';
// import BannerContainer from '../components/Banner/index.js';
import Footer from '../components/Footer/Footer.container'
// import { BrowserRouter } from 'react-router-dom';


function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState); // This will get data which get from server side
  // console.log(Header);
  return (
    <ApolloProvider client={apolloClient}>
        <Header />
        <Component {...pageProps} />
        <Footer />
    </ApolloProvider>
  );
}

export default MyApp;
