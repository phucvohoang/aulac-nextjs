import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { CUSTOMER_SEARCH_CUSTOMER } from '../../../../graphql/queries';
import Modal from './Modal';
import { checkAuth } from '../../../../util/helper';
import { propTypes } from 'qrcode.react';
const ModalContainer = (props) => {
  const [searchUsers, setSearchUsers] = useState([]);
  const [search, { loading }] = useLazyQuery(CUSTOMER_SEARCH_CUSTOMER, {
    onCompleted: (data) => {
      //console.log(data);
      const { docs } = data.customerSearchCustomer;
      let normalizedData = docs.map((user) => {
        const { _id, email, avatar, name } = user;
        return { uid: _id, email, avatar, name };
      });
      setSearchUsers(normalizedData);

      // setSearchStatus(false);
    },
    onError: (e) => {
      //console.log(e);
    },
    fetchPolicy: 'network-only',
  });
  const { currentUser } = checkAuth();
  const user = currentUser.info;
  const { _id, email, name, avatar = 'empty' } = user;
  const normalizedUserData = {
    uid: _id,
    email,
    name,
    avatar,
    role: 'customer',
  };

  return (
    <Modal
      close={props.close}
      listUsers={searchUsers}
      search={search}
      currentUser={normalizedUserData}
      isSearching={loading}
    />
  );
};

export default ModalContainer;
