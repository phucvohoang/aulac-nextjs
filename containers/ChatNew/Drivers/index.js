import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import ListOrder from './ListOrders.component';
import Driver from './Driver';
import {
  CUSTOMER_LIST_ORDERS,
  CUSTOMER_CANCEL_ORDER,
} from '../../../graphql/queries';
import { Spin } from 'antd';
import { firestore } from '../../../firebase/firebase.util';

const DriverContainer = (props) => {
  // const [customerListOrders, setListOrders] = useState({});
  const { user, isLoggedIn } = props;
  const [listUserAlreadyChat, setListUserAlreadyChat] = useState([]);
  const { data, loading, error } = useQuery(CUSTOMER_LIST_ORDERS, {
    variables: {
      shippingStatus: ['packed', 'shipped', 'delivered'],
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const unSub = firestore
      .collection(`/Messages/customer-driver/rooms`)
      .where(`${user._id}.email`, '==', user.email)
      .onSnapshot((snap) => {
        console.log(snap.size);
        let list = [];
        snap.forEach((doc) => {
          list.push({ ...doc.data(), roomId: doc.id });
        });
        // setListUserAlreadyChat(list);
        list.sort((a, b) => {
          if (a.lastMsgAt > b.lastMsgAt) {
            return -1;
          }
          if (a.lastMsgAt < b.lastMsgAt) {
            return 1;
          }
          return 0;
        });
        setListUserAlreadyChat(list);
      });
    return unSub;
  }, []);

  //console.log(data);
  // //console.log(customerListOrders)
  if (loading) return <Spin />;
  if (error) {
    //console.log(error);
    return <p>error</p>;
  }
  const { customerListOrders } = data;
  return (
    <Driver
      {...props}
      listOrders={customerListOrders}
      listUserAlreadyChat={listUserAlreadyChat}
      currentUser={user}
    />
  );
};

export default DriverContainer;
