import React from 'react';
import { ListMessage } from '../styled';
import Message from './Message';

const ListMessages = (props) => {
  const { listMsg, user } = props;
  //console.log(listMsg);
  return (
    <ListMessage id="messages-container">
      {listMsg.map((message, idx) => {
        return <Message user={user} message={message} key={idx} />;
      })}
    </ListMessage>
  );
};

export default ListMessages;
