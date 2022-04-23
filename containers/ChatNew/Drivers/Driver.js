import React, { useState } from 'react';
import { ListUsers, User, UserInfor, Avatar, Inputbox, Input } from '../styled';
import moment from 'moment';
import { setSeenState } from '../../../firebase/firebase.util';
import { UserEmail, SubInfor, Badge, Text } from './styled';
import { notification } from 'antd';
const Driver = (props) => {
  //console.log(props.listOrders);
  const customStyle = {
    padding: '.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
  const { currentUser } = props;
  const [state, setState] = useState({
    searchText: '',
    searchResult: [],
  });
  const handleChooseUser = (payload) => {
    props.handleChooseUser(payload, 'driver');
  };
  const renderDriverHelper = () => {
    // const list = props.listUserAlreadyChat ?? [];
    const escapeProperties = [
      'roomName',
      'lastMsg',
      'lastMsgAt',
      'newMsgs',
      'roomId',
    ];
    const list = [];
    props.listUserAlreadyChat.forEach((conversation) => {
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
    return list.map((conversation) => {
      // const { driver, orderCode } = order;
      const { user, lastMsgAt, lastMsg, newMsg, roomId } = conversation;
      return (
        <User
          active={user.uid === props?.to?.uid}
          key={user.uid}
          onClick={() => {
            setSeenState(roomId, currentUser._id, 'customer-driver');
            props.handleChooseUser(user, 'driver');
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
    });
  };
  const renderSearchResult = () => {
    const list = state.searchResult;
    if (list.length === 0) {
      return <p>Empty</p>;
    }
    return list.map((order) => {
      const { driver, orderCode } = order;
      return (
        <User
          key={order._id}
          onClick={() => {
            const { _id, email, name, avatar } = driver;
            const payload = {
              uid: _id,
              email: email ?? 'empty',
              name: name ?? 'empty',
              avatar: avatar ?? 'empty',
            };
            handleChooseUser(payload);
            setState({ ...state, searchText: '', searchResult: [] });
          }}
        >
          <Avatar>
            <img
              src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
              alt=""
            />
          </Avatar>
          <UserInfor>
            <h1>{driver?.name}</h1>
            <p style={{ color: 'goldenrod' }}>Mã Đơn Hàng: #{orderCode}</p>
          </UserInfor>
        </User>
      );
    });
  };
  const onSearchChange = (e) => {
    const { value } = e.target;
    setState({ ...state, searchText: value });
  };
  const onKeyDown = (e) => {
    const { searchText } = state;
    if (e.keyCode === 13 && searchText) {
      try {
        const convertNum = Number(searchText);
        const list = props.listOrders?.docs ?? [];
        const result = list.filter((order) => order.orderCode === convertNum);
        setState({ ...state, searchResult: result });
      } catch (e) {
        notification.warning({ message: 'Lỗi' });
      }
    }
  };
  return (
    <>
      <Inputbox style={customStyle}>
        <Input
          value={state.searchText}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          placeholder="Nhập mã đơn hàng cần tìm..."
        />
      </Inputbox>
      <ListUsers>
        {state.searchText ? renderSearchResult() : renderDriverHelper()}
      </ListUsers>
    </>
  );
};

export default Driver;
