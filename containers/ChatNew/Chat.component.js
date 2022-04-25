import React from 'react';
import {
  ChatContainer,
  ChatLeft,
  ChatMain,
  TitleSection,
  Avatar,
  Actions,
  Options,
  Option,
  Inputbox,
  Input,
  Tabs,
  Tab,
  DidNotSelectUser,
  UserInfor,
  Processing,
  SpinBox,
} from './styled';
import Driver from './Drivers';
import Group from './Group';
import Customer from './Customer';
import { notification, Spin } from 'antd';
import { getRoomName, checkAuth, normalizeGroupName } from '../../util/helper';
import {
  // setSeenToFalse,
  isUserExistOnSystem,
  createUserOnFirebase,
  checkOrCreateRoomUser,
  checkOrCreateRoomUserDriver,
  sendMessageToGroup,
  sendMessageToSpecifyUser,
  // checkOrCreateRoomDriverUser,
} from '../../firebase/firebase.util';
import FeatherIcon from 'feather-icons-react';
// import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import Stickers from '../../components/Chat-Widget/Stickers.container';
import GridGif from '../../components/Chat-Widget/Gif';
import ListMessage from './ListMessages/index';
import { getItem, setItem } from '../../util/localStorage';
import WrapperTranslate from '../../components/WrapperTranslate/WrapperTranslate';
// import { withTranslation } from 'react-i18next';
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'group',
      currentChat: null,
      msgText: '',
      settingUpRoom: false,
      isShowEmoji: false,
      isShowStickers: false,
      isShowGif: false,
      isSending: false,
      groupName: '',
      Picker: null,
      SKIN_TONE_MEDIUM_DARK: null,
    };
  }
  componentDidMount() {
    const oldData = getItem('oldChatWithData');
    if (oldData) {
      // //console.log('======== Not Found Old data ==========');
      // //console.log(oldData);
      const { currentChat, currentTab } = oldData;
      this.setState(() => ({ currentChat, currentTab }));
      const setState = this.setState;
      import('emoji-picker-react').then(
        ({ default: Picker, SKIN_TONE_MEDIUM_DARK }) => {
          Picker = Picker;
          SKIN_TONE_MEDIUM_DARK = SKIN_TONE_MEDIUM_DARK;
          // setEmoji({
          //   Picker,
          //   SKIN_TONE_MEDIUM_DARK,
          // });
          setState(() => ({ Picker, SKIN_TONE_MEDIUM_DARK }));
          console.log('fetched success');
        }
      );
    }
    // //console.log('======== Not Found Old data ==========');
  }
  // componentWillUnmount() {
  //   const { currentChat, currentTab } = this.state;
  //   setItem('oldChatWithData', { currentChat, currentTab });
  // }
  scrollToBottom = () => {
    if (!window) return;
    const { document } = window;
    const box = document.querySelector('#messages-container');
    box.scrollTop = box.scrollHeight;
  };
  renderListHelper = () => {
    const { currentTab } = this.state;
    switch (currentTab) {
      case 'driver':
        return (
          <Driver
            handleChooseUser={this.handleChooseUser}
            to={this.state.currentChat}
            user={this.props.user}
          />
        );
      case 'group':
        //console.log(`===== On Group ${this.state.groupName} ==========`);
        return (
          <Group
            handleChooseUser={this.handleChooseUser}
            groupName={this.state.groupName}
          />
        );
      case 'customer':
        return (
          <Customer
            handleChooseUser={this.handleChooseUser}
            to={this.state.currentChat}
            user={this.props.user}
            isLoggedIn={this.props.isLoggedIn}
          />
        );
      default:
        return <p>not found</p>;
    }
  };
  shareLocation = () => {
    // gooogle: https://google.com/maps?q=lat,lng
    if (!navigator.geolocation) {
      return notification.error({
        message: 'Lỗi',
        description: 'Version của browser không support tính năng này',
      });
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      // //console.log(position);
      const { coords } = position;
      // const url = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`;
      // //console.log(coords);
      const { latitude, longitude } = coords;
      const coordsString = JSON.stringify({ lat: latitude, lng: longitude });
      await this.sendMessageToFirebase(coordsString, 'location');
      this.setState(() => ({ isSending: false }));
    });
  };
  handleChooseUser = async (payload, type) => {
    if (type === 'driver') {
      const { currentUser } = this.props;
      const { uid, email, name, avatar } = payload;
      // this id will be use for checking on firebase
      setItem('oldChatWithData', { currentChat: payload, currentTab: type });
      this.setState(() => ({
        currentChat: { uid, email, name, avatar },
        to: {
          uid,
          email,
          avatar,
          role: 'driver',
        },
        currentTab: type,
      }));
      const driver = {
        uid: uid ?? 'empty',
        email: email ?? 'empty',
        name: name ?? 'empty',
        avatar: avatar ?? 'empty',
      };
      // const { _id: uid, email, name, avatar = 'empty' } = currentUser;
      // const { info } = currentUser;
      const user = {
        uid: currentUser._id ?? 'empty',
        email: currentUser.email ?? 'empty',
        name: currentUser.name ?? 'empty',
        avatar: currentUser.avatar ?? 'empty',
      };
      const isCreated = await checkOrCreateRoomUserDriver(user, driver);
      if (isCreated) {
        // setItem('oldChatWithData', { currentChat: payload, currentTab: type });
        this.setState(() => ({
          currentChat: driver,
          to: {
            ...driver,
            role: 'driver',
          },
          settingUpRoom: false,
          currentTab: type,
        }));
      } else {
        this.setState(() => ({ settingUpRoom: false }));
      }
    }
    if (type === 'customer') {
      const {
        _id: uid,
        email,
        name,
        avatar = 'empty',
      } = this.props.currentUser;
      const user = {
        uid,
        email,
        name,
        avatar,
      };
      this.setState(() => ({ settingUpRoom: true }));
      const isCreated = await checkOrCreateRoomUser(user, payload);
      if (isCreated) {
        setItem('oldChatWithData', { currentChat: payload, currentTab: type });
        this.setState(() => ({
          currentChat: payload,
          to: {
            ...payload,
            role: 'customer',
          },
          settingUpRoom: false,
          currentTab: type,
        }));
      } else {
        this.setState(() => ({ settingUpRoom: false }));
      }
    }

    if (type === 'group') {
      const { groupName } = payload;
      this.setState(() => ({ groupName }));
    }
  };
  handleChangeTab = (tab) => {
    this.setState(() => ({ currentTab: tab, currentChat: null }));
  };
  onKeyDown = async (e) => {
    const { msgText } = this.state;
    if (e.keyCode === 13 && msgText.trim()) {
      try {
        await this.sendMessageToFirebase(msgText, 'text');
        this.setState(
          () => ({ msgText: '', isSending: false }),
          this.scrollToBottom
        );
      } catch (e) {}
    }
  };
  getPathFirestore = (roomName = '') => {
    const { currentTab } = this.state;
    let path = '';
    if (currentTab === 'driver') {
      path = `/Messages/customer-driver/conversations/${roomName}/messages`;
    }
    if (currentTab === 'customer') {
      // //console.log(`======= In Customer If, roomName is :${roomName}`);
      path = `/Messages/customer-customer/conversations/${roomName}/messages`;
    }
    return path;
  };
  handleSendFile = async (url, type = 'image') => {
    // //console.log(url);
    try {
      await this.sendMessageToFirebase(url, type);
      this.setState(() => ({ isSending: false }));
    } catch (e) {
      // //console.log('Could not send image');
      this.setState(() => ({ isSending: false }));
    }
  };
  handleSendGif = async (content, type) => {
    //console.log(content);
    try {
      await this.sendMessageToFirebase(content, 'gif');
      this.setState(() => ({ isSending: false }));
    } catch (e) {
      //console.log('could not send gif');
    }
  };
  handleChangeFile = async (e) => {
    // //console.log(e);
    const file = e.target.files[0];
    // //console.log(file.type);
    // const acceptedFile = ['image/', 'video/'];
    let fileType = '';
    if (file.type.startsWith('image/')) {
      fileType = 'image';
    }
    if (file.type.startsWith('video/')) {
      fileType = 'video';
    }
    if (!fileType) {
      return notification.error({
        message: 'Lỗi, File không được hỗ trợ',
      });
    }
    try {
      const { data } = await this.props.uploadMedia({
        variables: {
          file,
        },
      });
      const { uploadChatMedia: url } = data; //
      // //console.log('======== Url response =========');
      // //console.log(url);
      this.handleSendFile(url, fileType);
    } catch (e) {
      this.setState(() => ({ isSending: false }));
      notification.error({
        message: 'Lỗi, không thể gửi',
      });
    }

    // .then(({data}) => {
    //   const { uploadChatMedia: url } = data; //

    // })
    // .catch((e) => {
    //   //console.log(e);
    // });
  };
  sendMessageToDriver = async (payload, pathFirestore) => {
    const { from, to } = payload; //from always is Customer, to is always Driver
    const isRoomExist = await checkOrCreateRoomUserDriver(from, to);
    console.log(payload);
    if (isRoomExist) {
      const isSent = await sendMessageToSpecifyUser(payload, pathFirestore);
      if (isSent) {
        // this.setState(() => ({ isSending: false }));
        return notification.success({
          message: 'Đã gửi',
        });
      }
      // this.setState(() => ({ isSending: false }));
      notification.error({
        message: 'Lỗi',
        description: 'Không thể gửi tin nhắn hỗ trợ cho tư vấn viên',
      });
    } else {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể gửi tin nhắn',
      });
    }
  };
  sendMessageToUser = async (payload, pathFirestore) => {
    const { from, to } = payload; //from always is Customer, to is always Driver
    const isRoomExist = await checkOrCreateRoomUser(from, to);
    if (isRoomExist) {
      // //console.log(
      //   '======== Preparing sending message to Specify user =========='
      // );
      // //console.log(payload);
      // //console.log(pathFirestore);

      const isSent = await sendMessageToSpecifyUser(payload, pathFirestore);
      if (isSent) {
        // this.setState(() => ({ isSending: false }));
        return notification.success({
          message: 'Đã gửi',
        });
      }
      // this.setState(() => ({ isSending: false }));
      notification.error({
        message: 'Lỗi',
        description: 'Không thể gửi tin nhắn hỗ trợ cho tư vấn viên',
      });
    } else {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể gửi tin nhắn',
      });
    }
  };

  sendMessageToFirebase = async (content, type) => {
    // const user = checkAuth().isLoggedIn ? checkAuth().currentUser : '';
    const user = this.props.isLoggedIn ? this.props.currentUser : '';
    if (user) {
      this.setState(() => ({ isSending: true }));
      const { avatar, email, _id: uid, name } = user;
      const { to, currentTab, groupName } = this.state;
      //console.log();
      // Group Chat Logic
      if (currentTab === 'group' && groupName) {
        const payload = {
          content,
          type,
          createdAt: Date.now(),
          from: {
            email,
            avatar,
            name,
            uid,
            role: 'customer',
          },
          seen: [uid],
        };
        // //console.log(payload);
        const isSent = await sendMessageToGroup(payload, groupName);
        if (isSent) {
          return notification.success({
            message: 'Đã gửi',
          });
        }
        return notification.error({
          message: 'Lỗi',
          description: 'Không thể gửi tin nhắn',
        });
      }

      // End Group Chat Logic
      // //console.log(to);
      const roomName = getRoomName(uid, to.uid);
      // //console.log(roomName);
      const payload = {
        content,
        createdAt: Date.now(),
        from: {
          avatar: 'empty',
          email,
          uid,
          role: 'customer',
        },
        isFromWeb: true,
        seen: false,
        to,
        type,
      };
      let pathFirestore = this.getPathFirestore(roomName);
      if (!pathFirestore) {
        return notification.error({
          message: 'Lỗi',
          description: 'Không thể gửi tin nhắn do ko lay dc pathFirestore',
        });
      }
      try {
        // Check does use exist on firebase
        const idOnFirebase = await isUserExistOnSystem(uid);
        // //console.log(idOnFirebase);
        if (idOnFirebase) {
          // if yes, set status message to false
          // const isSuccess = await setSeenToFalse(idOnFirebase);
          // if (!isSuccess) {
          //   return notification.error({
          //     message: 'Lỗi',
          //     description: 'Không thể gửi tin nhắn',
          //   });
          // }
          // sent message to firebase
          if (currentTab === 'driver') {
            this.sendMessageToDriver(payload, pathFirestore);
          }
          if (currentTab === 'customer') {
            console.log('===== Payload to Firebase =========');
            console.log(payload);
            this.sendMessageToUser(payload, pathFirestore);
          }
        } else {
          // User doesnt exist on firebase - create data of this user
          const payloadUser = {
            uid,
            email,
            name,
            createdAt: Date.now(),
            avatar: '',
            seen: false,
          };
          // create user information
          const isSuccess = await createUserOnFirebase(payloadUser);
          if (isSuccess) {
            // create success - send message
            const isSent = await sendMessageToSpecifyUser(
              payload,
              pathFirestore
            );
            if (isSent) {
              return notification.success({
                message: 'Đã gửi',
              });
            }
            notification.error({
              message: 'Lỗi',
              description: 'Không thể gửi tin nhắn cho tư vấn viên',
            });
          } else {
            notification.error({
              message: 'Lỗi',
              description: 'Không thể gửi tin nhắn cho tư vấn viên',
            });
          }
        }
      } catch (e) {
        // //console.log(e);
        notification.error({
          message: 'Không thể gửi tin nhắn',
        });
      }
    }
  };
  onTextChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ msgText: value }));
  };
  // ========= Emoji, Sticker, File, Section ===========
  toggleEmoji = () => {
    this.setState((prevState) => ({ isShowEmoji: !prevState.isShowEmoji }));
  };
  toggleSticker = () => {
    this.setState((prevState) => ({
      isShowEmoji: false,
      isShowStickers: !prevState.isShowStickers,
    }));
  };
  toggleGif = () => {
    this.setState((prevState) => ({
      isShowEmoji: false,
      isShowStickers: false,
      isShowGif: !prevState.isShowGif,
    }));
  };
  onEmojiClick = (event, emojiObject) => {
    const { unified, emoji } = emojiObject;
    // const msgs = [
    //   ...this.state.messages,
    //   { type: 'emoji', content: emoji, unified: unified },
    // ];
    this.setState((prevState) => ({
      msgText: `${prevState.msgText} ${emoji}`,
    }));
  };

  closeAllOptions = () => {
    this.setState(
      () => ({
        isShowEmoji: false,
        isShowGif: false,
        isShowStickers: false,
      }),
      this.scrollToBottom
    );
  };
  renderOverlayLoading = (type = 'user') => {
    const { currentChat, settingUpRoom } = this.state;
    return (
      <Processing isSelectUser={currentChat}>
        {currentChat || settingUpRoom ? (
          <Spin />
        ) : (
          <DidNotSelectUser>
            <img src="https://slek-react.laborasyon.com/static/media/unselected-chat.cfb49f55.svg" />
            <p>Xin Chon {type} de chat</p>
          </DidNotSelectUser>
        )}
      </Processing>
    );
  };
  render() {
    const {
      msgText,
      currentChat,
      currentTab,
      settingUpRoom,
      isSending,
      to,
      groupName,
      Picker,
      SKIN_TONE_MEDIUM_DARK,
    } = this.state;
    // //console.log(to);
    const { t } = this.props;
    return (
      <ChatContainer>
        <ChatLeft>
          <TitleSection>
            <h1 style={{ margin: '0 2rem' }}>{t('message')}</h1>
          </TitleSection>
          <Tabs>
            <Tab
              onClick={() => {
                this.handleChangeTab('driver');
              }}
              active={currentTab === 'driver'}
            >
              {t('driver')}
            </Tab>
            <Tab
              onClick={() => {
                this.handleChangeTab('group');
              }}
              active={currentTab === 'group'}
            >
              {t('group')}
            </Tab>
            <Tab
              onClick={() => {
                this.handleChangeTab('customer');
              }}
              active={currentTab === 'customer'}
            >
              {t('user')}
            </Tab>
          </Tabs>

          {this.renderListHelper()}
        </ChatLeft>
        <ChatMain>
          {currentTab === 'group'
            ? !groupName && this.renderOverlayLoading('nhóm')
            : !currentChat && this.renderOverlayLoading()}

          <TitleSection>
            <Avatar>
              <img
                src="https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-business-male-user-avatar-vector-png-image_1511454.jpg"
                alt=""
              />
            </Avatar>
            <UserInfor>
              <h1>
                {currentTab === 'group'
                  ? groupName
                    ? normalizeGroupName(groupName)
                    : ''
                  : currentChat?.name ?? ''}
              </h1>
            </UserInfor>
          </TitleSection>

          <ListMessage
            type={currentTab}
            user={this.props.user}
            to={this.state.currentChat}
            groupName={this.state.groupName}
          />
          {/* <MessageBox>
              <Message>
                <p>Text</p>
              </Message>
            </MessageBox>
            <MessageBox sent={true}>
              <Message sent={true}>
                <p>Text</p>
              </Message>
            </MessageBox>
          </ListMessage> */}
          <Actions>
            <Options>
              {/* Location */}
              <Option>
                <FeatherIcon
                  icon="map-pin"
                  className="rcw-send-icon"
                  alt="Send"
                  size={16}
                  // onClick={this.shareLocation}
                  onClick={this.shareLocation}
                />
              </Option>
              {/* Emoji */}
              <Option>
                <FeatherIcon
                  icon="smile"
                  // className="rcw-send-icon"
                  alt="Send"
                  size={16}
                  onClick={this.toggleEmoji}
                />

                {this.state.isShowEmoji && (
                  <div
                    className="sticker__container"
                    style={{
                      height: 'auto',
                      width: 'auto',
                    }}
                  >
                    {Picker && (
                      <Picker
                        onEmojiClick={this.onEmojiClick}
                        skinTone={SKIN_TONE_MEDIUM_DARK}
                      />
                    )}
                  </div>
                )}
              </Option>
              {/* File */}
              <Option>
                <label htmlFor="file-update">
                  <FeatherIcon
                    icon="image"
                    className="rcw-send-icon"
                    alt="Send"
                    size={16}
                  />
                </label>
                <input
                  type="file"
                  id="file-update"
                  onChange={this.handleChangeFile}
                />
              </Option>
              {/* Sticker */}
              <Option>
                <FeatherIcon
                  icon="feather"
                  className="rcw-send-icon"
                  alt="Send"
                  size={16}
                  onClick={() => {
                    this.toggleSticker();
                  }}
                />

                {this.state.isShowStickers && (
                  <Stickers sendImage={this.handleSendFile} />
                )}
              </Option>
              {/* Gif */}
              <Option>
                <p onClick={this.toggleGif} style={{ fontSize: '12px' }}>
                  GIF
                </p>
                {this.state.isShowGif && (
                  <GridGif handleSendImage={this.handleSendGif} />
                )}
              </Option>
              {isSending && (
                <SpinBox>
                  <Spin />
                  <p>Đang gửi...</p>
                </SpinBox>
              )}
            </Options>

            <Inputbox>
              <Input
                onFocus={this.closeAllOptions}
                value={msgText}
                onChange={this.onTextChange}
                onKeyDown={this.onKeyDown}
                placeholder="Nhap tin nhan"
              />
            </Inputbox>
          </Actions>
        </ChatMain>
      </ChatContainer>
    );
  }
}

export default WrapperTranslate(Chat);
