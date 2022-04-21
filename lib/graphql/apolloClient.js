import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
// import * as ws from 'ws';
import getConfig from 'next/config';
import { cache } from './cache';
import resolvers from './resolvers';
import typeDefs from './queries/typeDefs';
import { getMainDefinition } from '@apollo/client/utilities';
// import { WebSocketLink } from '';
// import * as ws from 'ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { checkAuth } from '../../util/helper';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { getItem } from '../util/localStorage';
const { publicRuntimeConfig } = getConfig();

const token = checkAuth().isLoggedIn ? checkAuth().currentUser.jwt : '';

const link = createUploadLink({
  uri:
    process.env.REACT_APP_GRAPHQL_URL ||
    // || 'http://localhost:1345/graphql'
    'https://api.aulacshop.com/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // getItem
  const { currentUser, isLoggedIn } = checkAuth();
  const language = getItem('language') ? getItem('language') : 'vn';
  let token = undefined;
  if (isLoggedIn) {
    token = currentUser.jwt;
  }
  // console.log(`Token in request: ${token}`);
  // return the headers to the context so httpLink can read them
  //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjBjMTQ1MTVjMzEwMWM3MGY0ODYxOCIsImlzQ3VzdG9tZXIiOnRydWUsImlhdCI6MTYwNjE5MDcyMywiZXhwIjoxNjA4NzgyNzIzfQ.XDseGA8QOdzpyxJ-snN0hLNeIFD8LMWWvZaXjAMqBGk"
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : '',
      'Content-Language': language === 'vn' ? 'vi-VN' : 'en-US',
    },
  };
});
const wsLink =
  typeof window === 'undefined'
    ? null
    : new WebSocketLink({
        uri:
          process.env.REACT_APP_WS_GRAPHQL_URL ||
          // || 'ws://localhost:1345/graphql'
          'wss://api.aulacshop.com/graphql',
        // webSocketImpl: ws,
        options: {
          reconnect: true,
          connectionParams: {
            Authorization: token,
          },
        },
      });

const splitLink =
  typeof window === 'undefined'
    ? []
    : split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        link
      );

function createApolloClient() {
  return new ApolloClient({
    // ssrMode: typeof window === 'undefined',
    link: typeof window === 'undefined' ? authLink : authLink.concat(splitLink),
    cache: cache,
    resolvers,
    typeDefs,
  });
}

export default createApolloClient;
