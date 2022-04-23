import React, { useState } from 'react';
import { useQuery, useReactiveVar, useLazyQuery, useMutation } from '@apollo/client';
import ProductDetail from './Product-Detail.component';
import { regionVar } from '../../graphql/cache';
import { GET_PRODUCT_BY_SLUG, CUSTOMER_GET_RECENTLY_VIEWED, CUSTOMER_ADD_RECENTLY_VIEWED } from '../../graphql/queries';
import { isLoggedInVar } from '../../graphql/cache'
import { Redirect } from 'react-router-dom';

const ProductDetailContainer = (props) => {
  const slug = props?.match?.params?.id ?? 'empty';
  // console.log(props.regions)
  const region = useReactiveVar(regionVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [listViewed, setListViewed] = useState([])
  const _id = region?._id ?? '';
  // console.log(_id)
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: {
      slug,
      saleRegion: _id,
    },
  });
  const [addRecentlyViewed] = useMutation(CUSTOMER_ADD_RECENTLY_VIEWED)
  const [getRecentlyView] = useLazyQuery(CUSTOMER_GET_RECENTLY_VIEWED, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      // console.log(data);
      // console.log(data.customerGetRecentlyViewed)
      setListViewed(data.customerGetRecentlyViewed)
    },
    onError: e => {
      console.log(e)
      setListViewed([])
    }
  })
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Redirect to="/" />;
  }
  const product = data.getProductBySlug;
  const customProduct = {
    ...product,
    salePrice: product.salePriceAfterDiscounted,
  };
  return <ProductDetail {...props} product={customProduct} isLoggedIn={isLoggedIn} getRecentlyView={getRecentlyView}  listViewed={listViewed} addRecentlyViewed={addRecentlyViewed} />;
};

export default ProductDetailContainer;
