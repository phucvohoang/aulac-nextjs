import React from 'react';
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
      <Script
        // type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
      ></Script>
      <Script
        // type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
      ></Script>
      <Script
        // type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
      ></Script>
      <Script
        // type="text/javascript"
        src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
      ></Script>
    </ApolloProvider>
  );
}

export default MyApp;
