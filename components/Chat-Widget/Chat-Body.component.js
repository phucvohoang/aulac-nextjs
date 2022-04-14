import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  createMessageOnFirebase,
  firestore,
  isUserExistOnSystem,
  setSeenToFalse,
  createUserOnFirebase,
  getSeenState,
} from '../../firebase/firebase.util';
import ChatMessage from './Chat-Message.component';
import FeaturedIcon from 'feather-icons-react';
import { Upload, Row, Col, notification, Spin, Button } from 'antd';
import Stickers from './Stickers.container';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import GridGif from './Gif';
import { checkAuth } from '../../util/helper';
import { lastMsgVar } from '../../lib/graphql/cache';
// import { sample } from './Stickers'

function shareLocation(cb) {
  // gooogle: https://google.com/maps?q=lat,lng
  if (!navigator.geolocation) {
    return notification.error({
      message: 'Lỗi',
      description: 'Version của browser không support tính năng này',
    });
  }
  navigator.geolocation.getCurrentPosition((position) => {
    // //console.log(position);
    const { coords } = position;
    // const url = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`;
    //console.log(coords);
    const { latitude, longitude } = coords;
    const coordsString = JSON.stringify({ lat: latitude, lng: longitude });
    cb(coordsString, 'location');
  });
}
const ChatBody = (props) => {
  const dummy = useRef(null);
  const [state, setState] = useState({
    isUploading: false,
    textValue: '',
    isShowEmoji: false,
    isShowGif: false,
    isShowStickers: false,
    isText: false,
    isEmoji: false,
  });
  // const [messages, setMessages] = useState([])
  const uid = props.user?._id;
  const { email, name } = props.user;
  const propsUpload = {
    name: 'file',
    showUploadList: false,
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    // listType: 'picture-card',

    customRequest: ({ onSuccess, onError, file }) => {},
  };
  const [formValue, setFormValue] = useState('');
  // const [isShowStickers, toogleSticker] = useState(false);
  ////console.log(uid)
  const messagesRef = firestore.collection(`/Messages/customer-admin/${uid}`);
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  const handleSendChatImage = async (url, type = 'image') => {
    sendDataToFirebase(url, type);
  };
  const storingToNotification = async () => {
    try {
      await firestore.collection('message-notifications').add({
        email,
        name,
        uid,
        seen: false,
        role: 'customer',
        createdAt: Date.now(),
      });
      notification.success({
        message: 'Done',
      });
    } catch (e) {
      notification.error({
        message: 'Lỗi',
        description: 'Could not storing to notification ',
      });
    }
  };

  const sendMessageToFirebase = async (content, type) => {
    const { user } = props;
    if (user) {
      const { avatar, email, _id: uid, name } = user;
      const checkType =
        type === 'text' ? (state.isText ? 'text' : 'emoji') : type;
      const payload = {
        content,
        createdAt: Date.now(),
        from: {
          avatar: 'empty',
          email,
          uid,
        },

        seen: false,
        to: null,
        type: checkType,
      };
      //console.log(payload);

      try {
        const idOnFirebase = await isUserExistOnSystem(uid);
        //console.log(idOnFirebase);
        if (idOnFirebase) {
          // const isSuccess = await setSeenToFalse(idOnFirebase);
          // if (!isSuccess) {
          //   return notification.error({
          //     message: 'Lỗi',
          //     description: 'Không thể gửi tin nhắn',
          //   });
          // }
          const isSent = await createMessageOnFirebase(payload);
          if (isSent) {
            // this.setState(() => ({ isSending: false }));
            return notification.success({
              message: 'Đã gửi',
            });
          }
          notification.error({
            message: 'Lỗi',
            description: 'Không thể gửi tin nhắn hỗ trợ cho tư vấn viên',
          });
        } else {
          const payloadUser = {
            uid,
            email,
            name,
            createdAt: Date.now(),
            avatar: '',
            seen: false,
          };
          const isSuccess = await createUserOnFirebase(payloadUser);
          if (isSuccess) {
            const isSent = await createMessageOnFirebase(payload);
            if (isSent) {
              // this.setState(() => ({ isSending: false }));
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
        notification.error({
          message: 'Không thể gửi tin nhắn',
        });
      }
    }
  };
  const sendDataToFirebase = async (content, type) => {
    // const existingUser = await firestore
    //   .collection('users')
    //   .where('uid', '==', uid)
    //   .get();
    await sendMessageToFirebase(content, type);
    setState(() => ({
      ...state,
      isUploading: false,
    }));
    dummy.current.scrollTop = dummy.current.scrollHeight;
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setFormValue(value);
  };
  const handleUploadImage = (info) => {
    const file = info.file.originFileObj;
    setState({
      ...state,
      isUploading: true,
    });
    // const acceptedType = ['image', 'video'];
    // const fileType = file.type.split('/')[0];
    if (['image', 'video'].includes(file.type.split('/')[0])) {
      props.uploadMedia(file, handleSendChatImage);
    }
  };
  const renderMessageHelper = () => {
    let listMsg = [];
    if (messages) {
      console.log(messages[0]);
      lastMsgVar(messages[messages.length - 1]); // update last msg
      listMsg = messages.map((msg, idx) => (
        <ChatMessage
          currentUser={uid}
          key={msg.id}
          message={msg}
          isLastMsg={idx === messages?.length - 1}
        />
      ));
      setTimeout(() => {
        dummy.current.scrollTop = dummy.current.scrollHeight;
        // const lastMsg = messages[messages.length - 1];
        // getSeenState(uid, lastMsg.id);
      }, 500);
    }

    return listMsg;
  };
  const handleSendLocation = () => {
    setState({
      ...state,
      isUploading: true,
    });
    shareLocation(sendDataToFirebase);
  };
  const handleKeyDown = async (e) => {
    if (e.keyCode === 13 && state.textValue) {
      // //console.log('press enter key');
      // handleSendMessage
      setState(() => ({
        ...state,
        // messages: [...prevState.messages, { type: 'text', content: this.state.textValue }],
        isUploading: true,
      }));
      await sendMessageToFirebase(state.textValue, 'text');
      setState(() => ({
        ...state,
        // messages: [...prevState.messages, { type: 'text', content: this.state.textValue }],
        textValue: '',
        isText: false,
        isEmoji: false,
      }));
    }
  };
  const handleTextChange = (e) => {
    const { value } = e.target;
    // scrollingToBottom();
    dummy.current.scrollTop = dummy.current.scrollHeight;
    setState(() => ({ ...state, textValue: value, isText: true }));
  };
  const onEmojiClick = (event, emojiObject) => {
    const { emoji } = emojiObject;

    setState({
      ...state,
      textValue: `${state.textValue} ${emoji}`,
      isEmoji: state.isText ? false : true,
    });
  };
  const toogleEmoji = () => {
    setState({
      ...state,
      isShowEmoji: !state.isShowEmoji,
      isShowGif: false,
      isShowStickers: false,
    });
  };
  const toogleGif = () => {
    setState({
      ...state,
      isShowGif: !state.isShowGif,
      isShowEmoji: false,
      isShowStickers: false,
    });
  };
  const toogleSticker = () => {
    setState({
      ...state,
      isShowStickers: !state.isShowStickers,
      isShowEmoji: false,
      isShowGif: false,
    });
  };
  return (
    <div className="rcw-conversation-container active" aria-live="polite">
      <div className="rcw-header">
        {/* <button className="rcw-close-button"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzU3IDM1NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzU3IDM1NzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJjbGVhciI+CgkJPHBvbHlnb24gcG9pbnRzPSIzNTcsMzUuNyAzMjEuMywwIDE3OC41LDE0Mi44IDM1LjcsMCAwLDM1LjcgMTQyLjgsMTc4LjUgMCwzMjEuMyAzNS43LDM1NyAxNzguNSwyMTQuMiAzMjEuMywzNTcgMzU3LDMyMS4zICAgICAyMTQuMiwxNzguNSAgICIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" className="rcw-close" alt="close"/></button> */}
        <h4 className="rcw-title">Âu Lạc</h4>
        {/* <span>And my cool subtitle</span> */}
      </div>
      <div id="messages" className="rcw-messages-container" ref={dummy}>
        {renderMessageHelper()}
        {/* <div className="rcw-message"><button type="button" className="ant-btn"><span>Text</span></button></div> */}
      </div>

      <div className="custom__actions">
        <div className="rcw-custom-actions">
          {/* <button
                className="rcw-send custom__icons"
                onClick={handleSendLocation}
              >
                <FeaturedIcon icon="map-pin" className="rcw-send-icon" alt="Send" size={16} />
              </button> */}
          <div className="rcw-send custom__icons" onClick={handleSendLocation}>
            <FeaturedIcon
              icon="map-pin"
              className="rcw-send-icon"
              alt="Send"
              size={16}
            />
          </div>

          <div className="rcw-send custom__icons stickers">
            <FeaturedIcon
              icon="smile"
              className="rcw-send-icon"
              alt="Send"
              size={16}
              onClick={toogleEmoji}
            />
            {state.isShowEmoji && (
              <div
                className="sticker__container"
                style={{
                  height: 'auto',
                  width: 'auto',
                }}
              >
                <Picker
                  onEmojiClick={onEmojiClick}
                  skinTone={SKIN_TONE_MEDIUM_DARK}
                />
              </div>
            )}
          </div>
          <div className="rcw-send custom__icons stickers">
            <FeaturedIcon
              icon="file-minus"
              className="rcw-send-icon"
              alt="Send"
              size={16}
              onClick={() => {
                toogleSticker();
              }}
            />
            {state.isShowStickers && (
              <Stickers sendImage={handleSendChatImage} />
            )}
          </div>
          <div className="rcw-send custom__icons">
            <Upload
              className="custom__icons"
              {...propsUpload}
              onChange={handleUploadImage}
              // style={{ display: 'block', margin: 0 }}
            >
              <FeaturedIcon size={16} icon="image" />
            </Upload>
          </div>
          <div className="rcw-send custom__icons stickers">
            {/* <FeaturedIcon
              icon="file-minus"
              className="rcw-send-icon"
              alt="Send"
              size={16}
              onClick={toogleGif}
            />
            <Button>Gif</Button> */}
            <p onClick={toogleGif} style={{ fontSize: '12px' }}>
              GIF
            </p>
            {state.isShowGif && (
              <GridGif handleSendImage={sendDataToFirebase} />
            )}
          </div>
          {/* <button className="rcw-send custom__icons">
                    <FeaturedIcon icon="camera" className="rcw-send-icon" alt="Send" />
                </button> */}

          {state.isUploading && (
            <div className="rcw-send custom__icons">
              <p style={{ marginRight: '10px', color: 'goldenrod' }}>
                Đang gửi..
              </p>
              <Spin size="small" />
            </div>
          )}
        </div>
      </div>
      <div className="input__chat">
        <div className="rcw-sender">
          <input
            onFocus={() => {
              // const messageBox = document.querySelector('#messages');
              // messageBox.scrollTop = messageBox.scrollHeight
              setState({
                ...state,
                isShowStickers: false,
                isShowEmoji: false,
                isShowGif: false,
              });
              dummy.current.scrollTop = dummy.current.scrollHeight;
            }}
            disabled={state.isUploading}
            onChange={handleTextChange}
            value={state.textValue}
            onKeyDown={handleKeyDown}
            type="text"
            className="rcw-new-message"
            name="message"
            placeholder={state.isUploading ? `Đang Gửi...` : 'Nhập Tin Nhắn...'}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
