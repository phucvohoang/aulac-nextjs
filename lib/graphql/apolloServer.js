import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function createApollpServer() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://api.aulacshop.com/graphql', // e.g. https://www.myapi.com/api/v2
      headers: {
        // or any other values for the http request
        // lang: 'en',
      },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApollpServer;
