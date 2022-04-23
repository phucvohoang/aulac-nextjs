import React from 'react';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import Home from './Home';
import { regionVar } from '../../graphql/cache';
const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      _id
      name
    }
  }
`;

const HomeContainer = (props) => {
  const { data, loading, error } = useQuery(LIST_CATEGORIES);
  const region = useReactiveVar(regionVar);
  // console.log(cartItems)
  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;
  let categories = data.listCategories;
  return <Home products={[]} categories={categories} region={region} />;
};

export default HomeContainer;
