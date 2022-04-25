import React, { useState, useEffect } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { regionVar } from '../../lib/graphql/cache';
import { SEARCH_PRODUCTS } from '../../lib/graphql/queries';
import SearchResult from './SearchResult.component';
// import { Redirect } from 'react-router-dom';
import { notification } from 'antd';
import { useRouter } from 'next/router';

const SearchResultContainer = (props) => {
  const router = useRouter();
  const keyword = props.keyword || '';
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
    // return <Redirect to="/" />;
    router.push('/');
    // return <h1>Empty</h1>
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
