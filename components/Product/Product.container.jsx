import React from 'react';
import { useReactiveVar } from '@apollo/client';
import Product from './Product.jsx';
import WrapperRouter from '../WrapperRouter/WrapperRouter.js';
import { addCartItem } from '../../lib/graphql/resolvers/utils';
import { regionVar, cartItemsVar, wishListVar } from '../../lib/graphql/cache';
const ProductContainer = (props) => {
  const region = useReactiveVar(regionVar);
  const cartItems = useReactiveVar(cartItemsVar);
  const wishList = useReactiveVar(wishListVar);
  const isInCart = cartItems[props.product._id] ? true : false;
  const isInWishList = wishList[props.product._id] ? true : false;
  const handleAdd = (item, cb) => {
    // // console.log('clicked')
    addCartItem(item);
  };
  const handleBuyImmediately = (item) => {
    addCartItem(item);
    props.router.push('/orders');
  };

  return (
    <Product
      {...props}
      buyNow={handleBuyImmediately}
      region={region}
      addItem={handleAdd}
      isInWishList={isInWishList}
      isInCart={isInCart}
    />
  );
  return <p>Loading</p>;
};

export default WrapperRouter(ProductContainer);
