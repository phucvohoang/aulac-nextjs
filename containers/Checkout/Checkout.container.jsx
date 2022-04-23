import React, { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import Checkout from './Checkout.jsx';
// import { GET_CURRENT_USER } from '../../graphql/resolvers';
import {
  cartItemsVar,
  checkoutDataVar,
  currentUserVar,
  isLoggedInVar,
  regionVar,
} from '../../lib/graphql/cache';
import { GET_LIST_CITIES } from '../../lib/graphql/queries';
import { flowRight } from 'lodash';
import { graphql } from '@apollo/client/react/hoc';
// import { Redirect } from 'react-router-dom';
import { checkingData } from '../../lib/graphql/resolvers/utils';
import { useRouter } from 'next/router';

const CheckoutContainer = (props) => {
  // const [clearData] = useMutation(CLEAR_CART);
  // const [checkout] = useMutation(CHECK_OUT);
  // const [addAddress] = useMutation(CUSTOMER_ADD_ADDRESS);
  const router = useRouter();
  const region = useReactiveVar(regionVar);
  const user = useReactiveVar(currentUserVar);
  const cartItems = useReactiveVar(cartItemsVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const checkoutData = useReactiveVar(checkoutDataVar);

  useEffect(() => {
    checkingData();
  }, []);

  if (!isLoggedIn) {
    return router.push('/');
  }
  return (
    <Checkout
      {...props}
      isLoggedIn={isLoggedIn}
      currentUser={user}
      checkoutData={checkoutData}
      cartItems={cartItems}
    />
  );
};

export default flowRight(graphql(GET_LIST_CITIES, { name: 'cities' }))(
  CheckoutContainer
);
