import React from 'react';
import { useQuery, gql } from '@apollo/client';
import News from './News';
import { LIST_NEWS } from '../../lib/graphql/queries';

const NewsContainer = () => {
  const { data, loading, error } = useQuery(LIST_NEWS, {
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const { listNews } = data;
  return <News listNews={listNews} />;
};
export default NewsContainer;
