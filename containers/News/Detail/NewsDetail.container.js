import React from 'react';
import NewsDetail from './NewsDetail';
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';

const NewsDetailContainer = (props) => {
  // console.log(props);
  const { slug } = props.match.params;
  const { data, loading, error } = useQuery(GET_NEWS_BY_SLUG, {
    variables: {
      slug,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <Spin />;
  }
  if (error) {
    return <p>Could not found the article</p>;
  }
  console.log(slug);
  console.log(data);

  const { getNewsBySlug } = data;

  return <NewsDetail data={getNewsBySlug} />;
};

export default NewsDetailContainer;
