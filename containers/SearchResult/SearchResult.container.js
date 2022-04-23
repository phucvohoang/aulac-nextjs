import React, { useState, useEffect } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { regionVar } from '../../graphql/cache';
import { SEARCH_PRODUCTS } from '../../graphql/queries';
import SearchResult from './SearchResult.component';
import { Redirect } from 'react-router-dom';
import { notification } from 'antd';

const SearchResultContainer = (props) => {
  const keyword = props.match.params.keyword;
  const region = useReactiveVar(regionVar);
  const [listProducts, setProducts] = useState({});
  const [searchProducts] = useLazyQuery(SEARCH_PRODUCTS, {
    onCompleted: (data) => {
      // //console.log(data);
      setProducts(data.searchProducts);
    },
    onError: (e) => {
      // //console.log(e)
      notification.error({
        message: 'Error',
        description: 'Đã có lỗi xảy ra',
      });
    },
  });
  useEffect(() => {
    searchProducts({
      variables: {
        keyword: keyword,
        saleRegion: region?._id ?? '',
        page: 1,
        perPage: 200,
      },
    });
  }, [keyword]);
  if (!keyword || !region) {
    return <Redirect to="/" />;
  }
  const products = listProducts.docs ? listProducts.docs : [];
  return (
    <SearchResult
      products={products}
      searchProducts={searchProducts}
      keyword={keyword}
      regionID={region ? region._id : ''}
    />
  );
};

export default SearchResultContainer;
