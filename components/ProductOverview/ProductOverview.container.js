import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import ProductOverview from './ProductOverview.component';
import { notification } from 'antd';
import {
  GET_HOME_PRODUCT_SECTIONS,
  CUSTOMER_ADD_WISHLIST,
  CUSTOMER_REMOVE_WISHLIST,
  GET_WISHLIST,
} from '../../lib/graphql/queries';
import {
  addItemWishList,
  initWishList,
  removeItemWishList,
} from '../../lib/graphql/resolvers/utils';
const ProductOverviewContainer = (props) => {
  const { region } = props;
  const [productLocal, setProductLocal] = useState(null);
  useQuery(GET_WISHLIST, {
    onCompleted: (data) => {
      initWishList(data.customerGetWishlist);
    },
  });
  const [addWishList] = useMutation(CUSTOMER_ADD_WISHLIST, {
    onCompleted: (data) => {
      addItemWishList(productLocal);
    },
    onError: (e) => {
      notification.error({
        message: 'Thất Bại',
        description: 'Không thể thêm sản phẩm vào danh mục ưa thích',
      });
    },
  });
  const [removeWishList] = useMutation(CUSTOMER_REMOVE_WISHLIST, {
    onCompleted: (data) => {
      removeItemWishList(productLocal);
    },
    onError: (e) => {
      notification.error({
        message: 'Thất Bại',
        description: 'Không thể bỏ sản phẩm ra khỏi danh mục ưa thích',
      });
    },
  });
  const { data, loading, error } = useQuery(GET_HOME_PRODUCT_SECTIONS, {
    variables: {
      saleRegion: region?._id,
    },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>We have an error when loading sample...</p>;
  }
  const sections = data.getHomeProductSections;
  const handleAddWishList = (item) => {
    setProductLocal(item);
    addWishList({
      variables: {
        id: item._id,
      },
    });
  };
  const handleRemoveWishList = (item) => {
    setProductLocal(item);
    removeWishList({
      variables: {
        id: item._id,
      },
    });
  };
  return (
    <ProductOverview
      sections={sections}
      addWishList={handleAddWishList}
      removeWishList={handleRemoveWishList}
    />
  );
};

export default ProductOverviewContainer;
