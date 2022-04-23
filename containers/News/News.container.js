import React from 'react';
import { useQuery, gql } from '@apollo/client';
import News from './News';
const LIST_NEWS = gql`
  query ListNews {
    listNews {
      docs {
        title
        _id
        slug
        content
        cover
      }
    }
  }
`;

const NewsContainer = () => {
  const { data, loading, error } = useQuery(LIST_NEWS);
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
