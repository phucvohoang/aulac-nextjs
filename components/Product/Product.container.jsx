import React, { useState } from 'react';
import { useReactiveVar, useMutation } from '@apollo/client';
import Product from './Product.jsx';
import WrapperRouter from '../WrapperRouter/WrapperRouter.js';
import {
  addCartItem,
  addItemWishList,
  removeItemWishList,
} from '../../lib/graphql/resolvers/utils';
import { regionVar, cartItemsVar, wishListVar } from '../../lib/graphql/cache';
import {
  CUSTOMER_ADD_WISHLIST,
  CUSTOMER_REMOVE_WISHLIST,
} from '../../lib/graphql/queries';
import { notification } from 'antd';
import { checkAuth } from '../../util/helper.js';
import { getItem, setItem } from '../../lib/util/localStorage.js';
// import { }
const ProductContainer = (props) => {
  const region = useReactiveVar(regionVar);
  const cartItems = useReactiveVar(cartItemsVar);
  const wishList = useReactiveVar(wishListVar);
  const isInCart = cartItems[props.product._id] ? true : false;
  const isInWishList = wishList[props.product._id] ? true : false;
  const [productLocal, setProductLocal] = useState(null);
  const [addWishList] = useMutation(CUSTOMER_ADD_WISHLIST, {
    onCompleted: (data) => {
      console.log(productLocal);
      const product = getItem('productWishListLocal');
      console.log(product);
      addItemWishList(product);
      notification.success({
        message: 'Thành công',
        description: 'Đã thêm vào danh sách yêu thích',
      });
    },
    onError: (e) => {
      const { isLoggedIn } = checkAuth();
      console.log(e);
      notification.error({
        message: 'Thất Bại',
        description: isLoggedIn
          ? 'Không thể thêm sản phẩm vào danh mục ưa thích.'
          : 'Xin hãy đăng nhập để thêm vào mục yêu thích',
      });
    },
  });
  const [removeWishList] = useMutation(CUSTOMER_REMOVE_WISHLIST, {
    onCompleted: (data) => {
      const product = getItem('productWishListLocal', item);
      removeItemWishList(product);
      notification.success({
        message: 'Thành công',
        description: 'Đã xoá khỏi danh sách yêu thích',
      });
    },
    onError: (e) => {
      notification.error({
        message: 'Thất Bại',
        description: 'Không thể bỏ sản phẩm ra khỏi danh mục ưa thích',
      });
    },
  });
  const handleAdd = (item, cb) => {
    // // console.log('clicked')
    addCartItem(item);
  };
  const handleBuyImmediately = (item) => {
    addCartItem(item);
    props.router.push('/orders');
  };
  const handleAddWishList = (item) => {
    console.log(item);
    setItem('productWishListLocal', item);
    // setProductLocal(item);
    addWishList({
      variables: {
        id: item._id,
      },
    });
  };
  const handleRemoveWishList = (item) => {
    // setProductLocal(item)
    setItem('productWishListLocal', item);
    removeWishList({
      variables: {
        id: item._id,
      },
    });
  };

  return (
    <Product
      {...props}
      buyNow={handleBuyImmediately}
      region={region}
      addItem={handleAdd}
      isInWishList={isInWishList}
      isInCart={isInCart}
      addWishList={handleAddWishList}
      removeWishList={handleRemoveWishList}
    />
  );
  // return <p>Loading</p>;
};

export default WrapperRouter(ProductContainer);
