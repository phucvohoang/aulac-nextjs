import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import Header from '../components/Header/Header.container';
import 'antd/dist/antd.css';
import '../scss/index.scss';
import Footer from '../components/Footer/Footer.container';
import Modal from '../components/Modal/Modal.container';
import ClientOnly, { SetupClient } from '../components/Wrapper/fetchingClient';
import Chat from '../components/Chat-Widget/Chat.container';
import BannerContainer from '../components/Banner';
import Script from 'next/script';
// import { BrowserRouter } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState); // This will get data which got from server side
  // console.log(Header);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((reg) => {
          console.log('ServiceWorker is registered successfully--4');
          console.log('Registration succeeded. Scope is ' + reg.scope);
        })
        .catch((e) => {
          console.log('could not register');
          console.log(e);
        });
    }
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Modal />
      <ClientOnly>
        <Modal />
        <Footer />
        <Chat />
        <SetupClient>
          <BannerContainer isLeft={true} />
          <BannerContainer isRight={true} />
        </SetupClient>
      </ClientOnly>
    </ApolloProvider>
  );
}

export default MyApp;
