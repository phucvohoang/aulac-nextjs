import React, { useState, useEffect } from 'react';
import { firestore } from '../../../firebase/firebase.util';
import { getRoomName } from '../../../util/helper';
import ListMessages from './ListMessages.component';
const ListMessageContainer = (props) => {
  const [listMsg, setListMsg] = useState([]);
  const { to, user, type } = props;
  let roomName = to ? getRoomName(user._id, props.to.uid) : 'empty';
  let groupName = props.groupName ? props.groupName : 'empty';
  //console.log(groupName);
  useEffect(() => {
    //console.log('room change', roomName);

    let path = 'empty';
    if (type === 'customer') {
      path = `/Messages/customer-customer/conversations/${roomName}/messages/`;
    }
    if (type === 'driver') {
      path = `/Messages/customer-driver/conversations/${roomName}/messages/`;
    }
    if (type === 'group') {
      path = `/Messages/group/conversations/${groupName}/messages`;
    }
    //console.log(path);
    const unsub = firestore
      .collection(path)
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        //console.log(snapshot.size);
        let list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), messageId: doc.id });
        });
        //console.log(list);
        setListMsg(list);
      });

    return unsub;
  }, [roomName, groupName]);
  //console.log(roomName);
  return <ListMessages listMsg={listMsg} user={user} />;
};
export default ListMessageContainer;
