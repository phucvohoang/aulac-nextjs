import React from 'react';
import {
  ModalContainer,
  LeftContent,
  RightContent,
  Row,
  Input,
  Title,
  ListUser,
  UserBox,
  User,
  UserName,
  UserEmail,
  UserAvatar,
  UserInfor,
  IconBox,
  Text,
  ActionBox,
} from '../styled';
import FeatherIcon from 'feather-icons-react';
import { Button as BtnAtn, notification, Space, Spin } from 'antd';
import { Flex } from '../../styled';

import {
  createNewGroupChat,
  updateGroup,
} from '../../../../firebase/firebase.util';
import { checkAuth, cleanUndefinedProperty } from '../../../../util/helper';
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserAdded: [],
      listIdAdded: [],
      groupName: '',
      isProcessing: false,
      searchText: '',
      isMissingRequiredField: '',
    };
  }
  handleSearchChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ searchText: value }));
  };
  handleGroupNameChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ groupName: value }));
  };
  onKeyDown = (e) => {
    const { searchText } = this.state;
    if (e.keyCode === 13 && searchText.trim()) {
      this.props.search({
        variables: {
          keyword: searchText,
        },
      });
    }
  };

  handleCreateGroup = async () => {
    const { listUserAdded, listIdAdded, groupName } = this.state;
    if (listIdAdded.length > 0 && listIdAdded.length > 0 && groupName) {
      this.setState(() => ({ isProcessing: true }));
      let { currentUser } = this.props;
      //console.log(currentUser);
      delete currentUser.address;
      currentUser = cleanUndefinedProperty(currentUser);
      const payload = {
        groupName: `${currentUser.uid}-${groupName
          .trim()
          .replaceAll(' ', '--')}`,
        members: [...listIdAdded, currentUser.uid],
        memberDetails: [...listUserAdded, currentUser],
        owner: currentUser.uid,
        createdAt: Date.now(),
      };
      //console.log(payload);
      try {
        const isCreated = await createNewGroupChat(payload);
        this.setState(() => ({ isProcessing: false }));
        if (isCreated) {
          this.handleQuit();
          return notification.success({
            message: 'B???n ???? t???o nh??m chat th??nh c??ng',
          });
        }

        notification.error({ message: 'B???n ???? t???o nh??m chat th??nh c??ng' });
      } catch (e) {
        //console.log(e);
        notification.error({ message: 'Kh??ng th??? t???o nh??m chat' });
      }
    } else {
      let isMissingRequiredField = '';
      if (!groupName) {
        isMissingRequiredField = 'Xin cung c???p t??n Nh??m';
      }
      if (listIdAdded.length === 0) {
        isMissingRequiredField = 'Xin th??m th??nh vi??n v??o nh??m';
      }
      this.setState(() => ({ isMissingRequiredField }));
    }
  };
  handleAddUser = (user) => {
    const { uid } = user;
    user.role = 'customer';
    let cleanedObject = cleanUndefinedProperty(user);
    this.setState((prevState) => ({
      listIdAdded: [...prevState.listIdAdded, uid],
      listUserAdded: [...prevState.listUserAdded, cleanedObject],
    }));
  };
  handleRemoveUser = (user) => {
    const { uid } = user;
    this.setState((prevState) => ({
      listIdAdded: prevState.listIdAdded.filter((id) => id !== uid),
      listUserAdded: prevState.listUserAdded.filter((item) => item.uid !== uid),
    }));
  };
  renderUserAddedHelper = () => {
    const { listUserAdded } = this.state;
    return listUserAdded.map((user) => {
      return (
        <UserBox key={user.uid}>
          <User>
            <UserAvatar>
              <img
                src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
                alt=""
              />
            </UserAvatar>
            <UserInfor>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserInfor>
          </User>
          <IconBox
            onClick={() => {
              this.handleRemoveUser(user);
            }}
          >
            <FeatherIcon icon="user-x" size={14} style={{ color: 'red' }} />
          </IconBox>
        </UserBox>
      );
    });
  };
  renderResultHelper = () => {
    const { listUsers } = this.props;
    const { listIdAdded } = this.state;
    return listUsers.map((user) => {
      return (
        <UserBox key={user.uid}>
          <User>
            <UserAvatar>
              <img
                src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
                alt=""
              />
            </UserAvatar>
            <UserInfor>
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserInfor>
          </User>
          <IconBox
            onClick={() => {
              this.handleAddUser(user);
            }}
          >
            {listIdAdded.includes(user.uid) ? (
              <FeatherIcon
                icon="user-check"
                size={14}
                style={{ color: 'green' }}
              />
            ) : (
              <Text>Th??m</Text>
            )}
          </IconBox>
        </UserBox>
      );
    });
  };
  handleQuit = () => {
    this.setState(
      () => ({
        listUserAdded: [],
        listIdAdded: [],
        groupName: '',
        isProcessing: false,
        searchText: '',
        isMissingRequiredField: '',
      }),
      this.props.close()
    );
  };
  render() {
    const { listUserAdded, isMissingRequiredField, groupName } = this.state;
    return (
      <ModalContainer>
        <LeftContent>
          <Row>
            <Title>Nh??p T??n Group</Title>
            <Input
              placeholder="Nh???p t??n group.."
              value={groupName}
              onChange={this.handleGroupNameChange}
            />
          </Row>
          <Text>C??c th??nh vi??n s??? th??m: {listUserAdded.length} th??nh vi??n</Text>

          <ListUser>{this.renderUserAddedHelper()}</ListUser>
        </LeftContent>
        <RightContent>
          <Row>
            <Title>T??m th??nh vi??n</Title>
            <Input
              placeholder="Nh???p T??n, Email c???n th??nh vi??n"
              value={this.state.searchText}
              onChange={this.handleSearchChange}
              onKeyDown={this.onKeyDown}
            />
          </Row>
          <Text>???? t??m th???y {this.props.listUsers?.length} k???t qu???</Text>

          <ListUser>
            {this.props.isSearching ? (
              <Flex>
                <Spin />
              </Flex>
            ) : (
              this.renderResultHelper()
            )}

            {/* <UserBox>
              <User>
                <UserAvatar>
                  <img
                    src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
                    alt=""
                  />
                </UserAvatar>
                <UserInfor>
                  <UserName>Name</UserName>
                  <UserEmail>Email</UserEmail>
                </UserInfor>
              </User>
              <IconBox>
                <Text>Th??m</Text>
              </IconBox>
            </UserBox> */}
          </ListUser>
          <ActionBox>
            {isMissingRequiredField && (
              <Text style={{ color: 'red', marginRight: '2rem' }}>
                {isMissingRequiredField}
              </Text>
            )}

            <Space size="large">
              <BtnAtn onClick={this.handleQuit}>Hu???</BtnAtn>
              <BtnAtn
                loading={this.state.isProcessing}
                onClick={this.handleCreateGroup}
                style={{
                  backgroundColor: 'goldenrod',
                  color: '#fff',
                  border: 'none',
                  outline: 'none',
                }}
              >
                T???o Group
              </BtnAtn>
            </Space>
          </ActionBox>
        </RightContent>
      </ModalContainer>
    );
  }
}

export default Modal;
