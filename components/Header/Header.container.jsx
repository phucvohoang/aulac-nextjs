import React from 'react';
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client';
import Header from './Header.jsx';
import { LIST_SALE_REGIONS } from '../../lib/graphql/queries';
import { regionVar, cartItemsVar, languageVar } from '../../lib/graphql/cache';
import {
  handleSetRegion,
  removeCartItem,
  switchLanguage,
} from '../../lib/graphql/resolvers/utils';
import { flowRight } from 'lodash';
import { graphql } from '@apollo/client/react/hoc';
//import data from '../../data/fake-data.js';

const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      _id
      name
    }
  }
`;

const GET_FACEBOOK_URL = gql`
  query LoginSNS($provider: SNSProvider!, $redirectUri: String!) {
    loginSNS(provider: $provider, redirectUri: $redirectUri)
  }
`;

const GET_GOOGLE_URL = gql`
  query LoginSNS($provider: SNSProvider!, $redirectUri: String!) {
    loginSNS(provider: $provider, redirectUri: $redirectUri)
  }
`;
const GET_REGION = gql`
  {
    region @client
  }
`;

// const ADD_ITEM_TO_CART = gql`

//     mutation addItemToCart($type:)
// `;

const HeaderContainer = (props) => {
  // const { data, loading } = useQuery(GET_CART_ITEMS);
  // const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART);
  const language = useReactiveVar(languageVar);
  const region = useReactiveVar(regionVar);
  const cartItems = useReactiveVar(cartItemsVar);
  const handleRemove = (item) => {
    removeCartItem(item);
    // removeItem({ variables: { item: item } }).then((data) => {
    //   // // console.log('remove correctly');
    //   // // console.log(data)
    // });
  };
  const handleChooseRegion = (region) => {
    handleSetRegion(region);
  };
  const switchLang = (lng) => {
    // languageVar(lng);
    switchLanguage(lng);
  };
  const FBUrl = props.facebookURL.loginSNS;
  const GoogleUrl = props.googleURL.loginSNS;
  const saleRegions = props.regions.listSaleRegions;
  const categories = props.data.listCategories;
  // console.log('======= Data from CartItems =========');
  // console.log(cartItems);
  return (
    <Header
      {...props}
      language={language}
      regionLocal={props?.regionLocal?.region}
      saleRegions={saleRegions}
      cartItems={cartItems}
      region={region}
      switchLang={switchLang}
      remove={handleRemove}
      chooseRegion={handleChooseRegion}
      categories={categories}
      FBUrl={FBUrl}
      GoogleUrl={GoogleUrl}
    />
  );
};

const url = process.env.REACT_APP_HOST || 'http://localhost:3000';
export default flowRight(
  graphql(LIST_SALE_REGIONS, { name: 'regions' }),
  graphql(LIST_CATEGORIES),
  graphql(GET_REGION, { name: 'regionLocal' }),
  graphql(GET_FACEBOOK_URL, {
    options: {
      variables: {
        provider: 'facebook',
        // redirectUri: "http://localhost:3000/auth/facebook/callback"
        redirectUri: `${url}/auth/facebook/callback`,
      },
    },
    // props: ({data}) => {
    //     // console.log('im in props get facebook url');
    //     // console.log(facebookURL.loginSNS)
    //     return {
    //         facebookURL: data.loginSNS
    //     }
    // },
    name: 'facebookURL',
  }),
  graphql(GET_GOOGLE_URL, {
    options: {
      variables: {
        provider: 'google',
        redirectUri: `${url}/auth/google/callback`,
        // redirectUri: "http://localhost:3000/auth/google/callback"
      },
    },
    name: 'googleURL',
  })
)(HeaderContainer);
