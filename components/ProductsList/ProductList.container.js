import React, { useState } from 'react';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import ProductList from './ProductList.component';
import { notification } from 'antd';
import {
  AddItemToWishList,
  LIST_PRODUCTS,
  CUSTOMER_ADD_WISHLIST,
  CUSTOMER_REMOVE_WISHLIST,
} from '../../lib/graphql/queries';
import {
  addItemWishList,
  removeItemWishList,
} from '../../lib/graphql/resolvers/utils';
import { scrollToTop } from '../../util/helper';

const ProductListContainer = (props) => {
  const { categoryID, region } = props;
  // console.log('============ Product List Container ===================')
  // console.log(region._id, categoryID)
  const [productLocal, setProductLocal] = useState(null);
  const [listProducts, setProducts] = useState({});
  const [addWishListLocal] = useMutation(AddItemToWishList);
  // const { data, loading, error } = useLazyQuery(LIST_PRODUCTS, {
  //     variables: {
  //         category: categoryID,
  //         saleRegion: region._id,
  //         page: 1,
  //         perPage: 20
  //     }
  // })
  const [getProduct] = useLazyQuery(LIST_PRODUCTS, {
    onCompleted: (data) => {
      // console.log(data.listProducts);
      // window.scrollTo(0, 0);
      scrollToTop();
      setProducts(data.listProducts);
    },
    onError: (e) => {
      // console.log(e)
      console.log('could not fetch product from server');
    },
    fetchPolicy: 'network-only',
  });
  const [addWishList] = useMutation(CUSTOMER_ADD_WISHLIST, {
    onCompleted: (data) => {
      // console.log(data);
      // refetch().then(res => {
      //     console.log('refetch successfully')
      // })
      addItemWishList(productLocal);
      // addWishListLocal({variables: {
      //     item: productLocal
      // }}).then(res => {
      //     notification.success({
      //         message: 'Thành Công',
      //         description: 'Đã thêm danh mục ưa thích'
      //     })
      // })
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
  const products = listProducts.docs ? listProducts.docs : [];
  const totalDocs = listProducts.totalDocs ? listProducts.totalDocs : 1;
  return (
    <ProductList
      addWishList={handleAddWishList}
      removeWishList={handleRemoveWishList}
      products={products}
      totalDocs={totalDocs}
      getProduct={getProduct}
      regionId={region?._id}
      categoryID={categoryID}
    />
  );
};

export default ProductListContainer;