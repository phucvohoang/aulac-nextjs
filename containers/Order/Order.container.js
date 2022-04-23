import React from 'react';
import Order from './Order';
import { gql, useQuery } from '@apollo/client';
const LIST_SALE_REGIONS = gql`
  query ListSaleRegions {
    listSaleRegions {
      _id
      name
      branches {
        _id
        name
        disabled
        address {
          addressNo
        }
      }
    }
    region @client
  }
`;

const OrderContainer = () => {
  const { data, loading, error } = useQuery(LIST_SALE_REGIONS);

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>We have an error...</p>;
  }

  const { listSaleRegions } = data;
  return <Order listRegions={listSaleRegions} />;
};

export default OrderContainer;
