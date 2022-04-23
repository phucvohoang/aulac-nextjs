import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import ListOrder from './ListOrders.component';
import {
  CUSTOMER_LIST_ORDERS,
  CUSTOMER_CANCEL_ORDER,
} from '../../../lib/graphql/queries';

const ListOrdersContainer = (props) => {
  const [customerListOrders, setListOrders] = useState({});
  const [cancel] = useMutation(CUSTOMER_CANCEL_ORDER, {
    // refetchQueries: [{ query: CUSTOMER_LIST_ORDERS }],
  });
  const [getOrders] = useLazyQuery(CUSTOMER_LIST_ORDERS, {
    onCompleted: (data) => {
      const { customerListOrders } = data;
      // console.log(customerListOrders);
      setListOrders(customerListOrders);
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: 'network-only',
  });
  // if(loading) return <p>Loading...</p>
  // if(error) {
  //     console.log(error)
  //     return <p>error</p>
  // }

  // const { customerListOrders } = data;
  // console.log(customerListOrders)
  return (
    <ListOrder
      {...props}
      listOrders={customerListOrders}
      getOrders={getOrders}
      cancelOrder={cancel}
    />
  );
};

export default ListOrdersContainer;
