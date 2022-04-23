import React, { useEffect, useState } from 'react';
import Group from './Group';
import { firestore } from '../../../firebase/firebase.util';
import { checkAuth } from '../../../util/helper';
const GroupContainer = (props) => {
  const { currentUser } = checkAuth();
  const [groups, setGroups] = useState([]);
  const currentId = currentUser?._id ?? 'empty';
  console.log(currentId);
  useEffect(() => {
    const unsub = firestore
      .collection('/Messages/group/manages')
      .where('members', 'array-contains', currentId)
      // .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const groups = [];
        querySnapshot.forEach((group) => {
          console.log(group.data());
          groups.push({ ...group.data(), uid: group.id });
        });
        setGroups(groups);
      });
    return unsub;
  }, []);
  return (
    <Group
      groups={groups}
      groupName={props.groupName}
      handleChooseUser={props.handleChooseUser}
    />
  );
};

export default GroupContainer;
