import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import OrderDetail from './OrderDetails';
import { CUSTOMER_GET_ORDER } from '../../lib/graphql/queries';
import { isLoggedInVar, currentUserVar } from '../../lib/graphql/cache';
const OrderDetailContainer = (props) => {
  //console.log(props);
  const currentUser = useReactiveVar(currentUserVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const orderId = props?.orderId ?? 'empty';
  // const { data: dataUser, loading, error } = useQuery(GET_CURRENT_USER);
  const { data: order } = useQuery(CUSTOMER_GET_ORDER, {
    fetchPolicy: 'network-only',
    variables: {
      id: orderId,
    },
  });
  //console.log('calling');
  // //console.log(dataUser);
  //console.log('after calling');

  // const user = dataUser?.currentUser;
  return (
    <OrderDetail
      user={currentUser}
      orderId={orderId}
      order={order?.customerGetOrder}
      isLoggedIn={isLoggedIn}
      // currentUser={currentUser}
    />
  );
};

export default OrderDetailContainer;
