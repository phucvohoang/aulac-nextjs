import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Footer from './Footer.component';
import ClientOnly from '../Wrapper/fetchingClient';

const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      _id
      name
    }
  }
`;

const FooterContainer = () => {
  const { data, loading, error } = useQuery(LIST_CATEGORIES);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const categories = data.listCategories;
  // console.log(categories)
  return <Footer categories={categories} />;
};

export default FooterContainer;
