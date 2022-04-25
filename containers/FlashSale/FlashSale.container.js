import React, { useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import SearchResult from './FlashSale.component';
import { GET_PROMO_FLASH_SALE } from '../../lib/graphql/queries';
import { regionVar } from '../../lib/graphql/cache';

const FlashSaleContainer = (props) => {
  // const { data, loading, error } = useQuery(GET_REGIONS);
  const region = useReactiveVar(regionVar);
  const [listProducts, setProducts] = useState({});
  const [searchProducts] = useLazyQuery(GET_PROMO_FLASH_SALE, {
    onCompleted: (data) => {
      // //console.log(data);
      setProducts(data.getPromoFlashSale);
    },
    onError: (e) => {
      // //console.log(e)
    },
    fetchPolicy: 'network-only',
  });

  // if (loading) {
  //   return <p>Loading</p>;
  // }
  // if (error) {
  //   return <p>error</p>;
  // }

  // const { region } = data;

  const products = listProducts.products ? listProducts.products : [];
  return (
    <SearchResult
      products={products}
      searchProducts={searchProducts}
      regionID={region ? region._id : ''}
    />
  );
};

export default FlashSaleContainer;
