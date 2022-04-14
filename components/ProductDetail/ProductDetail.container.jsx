import React from 'react';
import { useReactiveVar } from '@apollo/client';
import ProductDetail from './ProductDetail.component.jsx';
import {
  addCartItem,
  updateCartItem,
  showPopChat,
} from '../../lib/graphql/resolvers/utils';
import {
  isShowPopChatVar,
  cartItemsVar,
  currentUserVar,
  isLoggedInVar,
} from '../../lib/graphql/cache';

const ProductDetailContainer = (props) => {
  // console.log(props)
  // const { data, loading, error } = useQuery(GET_CART_ITEMS);
  const cartItems = useReactiveVar(cartItemsVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const currentUser = useReactiveVar(currentUserVar);
  // const { currentUser } = props.user;
  // const id = props.match.params.id;
  if (props.product && currentUser) {
    let currentProduct = props.product;
    const isInCart = cartItems[currentProduct._id] ? true : false;
    currentProduct = { ...currentProduct, quantity: 1 };
    // console.log(currentProduct)
    const handleAdd = (item) => {
      addCartItem(item);
    };
    // console.log(currentUser)
    const handleUpdate = (item) => {
      updateCartItem(item);
    };
    const handleShowPopChat = () => {
      showPopChat();
    };
    return (
      <ProductDetail
        setShowPanel={props.setShowPanel}
        product={isInCart ? cartItems[currentProduct._id] : currentProduct}
        isInCart={isInCart}
        add={handleAdd}
        update={handleUpdate}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleShowPopChat={handleShowPopChat}
      />
    );
  }
  return <p>Loading...</p>;
};
export default ProductDetailContainer;
