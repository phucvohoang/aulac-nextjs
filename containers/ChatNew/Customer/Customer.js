import { Button, Row, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { setSeenState } from '../../../firebase/firebase.util';
import { ListUsers, User, UserInfor, Avatar, Inputbox, Input } from '../styled';
import { UserEmail, SubInfor, Badge, Text } from './styled';
const customStyle = {
  padding: '.5rem 1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
};
/*
  User can search, can render a list of users that talked before
*/
const Customer = (props) => {
  const {
    setSearchStatus,
    searchStatus,
    listUserResponsedFromSearch,
    searchUser,
    setListUserResponsedFromSearch,
    listConversations,
    currentUser,
  } = props;
  const [state, setState] = useState({
    searchMode: false,
    listUserResponsedFromSearch: [],
    searchText: '',
    listMessages: [],
  });
  const onKeyDown = (e) => {
    const { searchText } = state;
    if (e.keyCode === 13 && searchText) {
      setSearchStatus(true);

      searchUser({
        variables: {
          keyword: searchText,
        },
      });
    }
  };
  const onSearchChange = (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setListUserResponsedFromSearch([]);
      return setState({ ...state, searchText: value, searchMode: false });
    }
    setState({ ...state, searchText: value, searchMode: true });
  };
  const renderContentHelper = () => {
    if (state.searchMode) {
      //console.log('in Search Mode', searchStatus);
      // This case happens when user searching
      if (searchStatus) {
        // searching and waiting for response from api
        return (
          <Row style={{ margin: '1rem 0' }} justify="center">
            {' '}
            <Spin />
          </Row>
        );
      } else {
        // got response from api
        return (
          <ListUsers>
            {listUserResponsedFromSearch.map((user) => {
              return (
                <User
                  active={true}
                  key={user.uid}
                  onClick={() => {
                    props.handleChooseUser(user, 'customer');
                  }}
                >
                  <Avatar>
                    <img
                      src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
                      alt=""
                    />
                  </Avatar>
                  <UserInfor>
                    <h1>{user.email}</h1>
                  </UserInfor>
                </User>
              );
            })}
          </ListUsers>
        );
      }
    } else {
      // Here is normal mode, user does not search, data will get from firebase
      const escapeProperties = [
        'roomName',
        'lastMsg',
        'lastMsgAt',
        'newMsgs',
        'roomId',
      ];
      const list = [];
      listConversations.forEach((conversation) => {
        const {
          lastMsg = '',
          lastMsgAt = '',
          newMsgs = {},
          roomId = '',
        } = conversation;
        const userIdFiltered = Object.keys(conversation).filter(
          (key) => !escapeProperties.includes(key) && key !== currentUser._id
        )[0];
        const userData = {
          user: conversation[userIdFiltered],
          lastMsg,
          lastMsgAt,
          newMsg: newMsgs?.[currentUser._id],
          roomId,
        };
        list.push(userData);
      });

      //console.log(list);
      return (
        <ListUsers>
          {list.map((conversation) => {
            const { user, lastMsgAt, lastMsg, newMsg, roomId } = conversation;
            return (
              <User
                active={user.uid === props?.to?.uid}
                key={user.uid}
                onClick={() => {
                  setSeenState(roomId, currentUser._id);
                  props.handleChooseUser(user, 'customer');
                }}
              >
                <Avatar>
                  <img
                    src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
                    alt=""
                  />
                </Avatar>
                <UserInfor>
                  <UserEmail>{user.email}</UserEmail>
                  <SubInfor>
                    <Text>{lastMsg}</Text>
                    <Text>-</Text>
                    {lastMsgAt && <Text>{moment(lastMsgAt).calendar()}</Text>}

                    {(newMsg?.numberOfNewMsg ?? 0) > 0 && (
                      <Badge>
                        <p>{newMsg?.numberOfNewMsg ?? 0}</p>
                      </Badge>
                    )}
                  </SubInfor>
                </UserInfor>
              </User>
            );
          })}
        </ListUsers>
      );
    }
  };
  return (
    <>
      <Inputbox style={customStyle}>
        <Input
          value={state.searchText}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          placeholder="Nhập Email, Tên cần tìm"
        />
      </Inputbox>
      {renderContentHelper()}
    </>
  );
};

export default Customer;
