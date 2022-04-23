import React, { useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Customer from './Customer';
import { checkAuth, getRoomName } from '../../../util/helper';
import { useState } from 'react';
import { firestore } from '../../../firebase/firebase.util';
// import { responsePathAsArray } from 'graphql';
const CUSTOMER_SEARCH_CUSTOMER = gql`
  query CustomerSearchCustomer(
    $keyword: String!
    $page: Int
    $perPage: Int
    $orderBy: QueryCustomerOrderBy
    $orderDir: QueryOrderByDirection
  ) {
    customerSearchCustomer(
      keyword: $keyword
      page: $page
      perPage: $perPage
      orderBy: $orderBy
      orderDir: $orderDir
    ) {
      docs {
        _id
        name
        email
        avatar
      }
    }
  }
`;

const CustomerContainer = (props) => {
  // const { currentUser, isLoggedIn } = checkAuth();
  const { user, isLoggedIn } = props;
  const [searchStatus, setSearchStatus] = useState(false);
  const [listUserAlreadyChat, setListUserAlreadyChat] = useState([]);
  // let user = null;
  const [listUserResponsedFromSearch, setListUserResponsedFromSearch] =
    useState([]);
  const [searchUser] = useLazyQuery(CUSTOMER_SEARCH_CUSTOMER, {
    onCompleted: (data) => {
      console.log(data);
      const { docs } = data.customerSearchCustomer;
      let normalizedData = docs.map((user) => {
        const { _id, email, avatar, name } = user;
        return { uid: _id, email, avatar, name };
      });
      setListUserResponsedFromSearch(normalizedData);
      setSearchStatus(false);
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: 'network-only',
  });

  // if (isLoggedIn) {
  //   user = currentUser.info;
  // }
  useEffect(() => {
    const unSub = firestore
      .collection(`/Messages/customer-customer/rooms`)
      .where(`${user._id}.email`, '==', user.email)
      .onSnapshot((snap) => {
        let list = [];
        snap.forEach((doc) => {
          list.push({ ...doc.data(), roomId: doc.id });
        });
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
  let roomName = props.to ? getRoomName(user._id, props.to.uid) : 'empty';
  return (
    <Customer
      roomName={roomName}
      currentUser={user}
      to={props.to}
      handleChooseUser={props.handleChooseUser}
      listConversations={listUserAlreadyChat}
      searchUser={searchUser}
      searchStatus={searchStatus}
      setListUserResponsedFromSearch={setListUserResponsedFromSearch}
      setSearchStatus={setSearchStatus}
      listUserResponsedFromSearch={listUserResponsedFromSearch}
    />
  );
};

export default CustomerContainer;
