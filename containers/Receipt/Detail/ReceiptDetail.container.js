import React from 'react';
import ReceiptDetail from './ReceiptDetail.component';
import { useQuery, gql } from '@apollo/client';
import { Spin } from 'antd';

const ReceiptDetailContainer = (props) => {
  // console.log(props);
  const { slug } = props.match.params;
  const { data, loading, error } = useQuery(GET_RECEIPT_BY_SLUG, {
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

  const { getFoodReceiptBySlug } = data;

  return <ReceiptDetail data={getFoodReceiptBySlug} />;
};

export default ReceiptDetailContainer;
