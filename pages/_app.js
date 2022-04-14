import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
// import Header from '../components/Header/Header.container';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState); // This will get data which get from server side
  return (
    <ApolloProvider client={apolloClient}>
      {/* <Header /> */}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
