import React, { useState, useEffect } from 'react';
import Video from './Video/index';
import moment from 'moment';
import { Image } from 'antd';
import { getSeenState, setSeenMsg } from '../../firebase/firebase.util';
import { lastMsgVar } from '../../lib/graphql/cache';
const Message = (props) => {
  const [isShowSeen, setSeenState] = useState(false);
  const [isChecked, setChecked] = useState(false);
  console.log('This is lastMsgVar');
  console.log(lastMsgVar());
  useEffect(() => {
    shouldRenderSeenState();
  }, []);
  // const messageClass = uid === props.currentUser ? "sent" : "received";
  const messageClass =
    props.message.from?.email === 'admin' ? 'rcw-response' : 'rcw-client';

  const renderMessageHelper = () => {
    let { uid, content, type, createdAt, photoURL } = props.message;
    // console.log(moment(createdAt.toDate()).calendar());

    switch (type) {
      case 'text':
        return (
          <div className="rcw-message-text">
            <p>{content}</p>
            <p className="message-time">{renderTime()}</p>
          </div>
        );
      case 'image':
        // console.log('got image', content)
        // return <Video />;
        return (
          <div className="rcw-message-text" style={{ cursor: 'pointer' }}>
            <p>
              <Image
                src={content}
                alt="this is picture"
                className="rcw-message-img"
              />
            </p>
            <p className="message-time">{renderTime()}</p>
          </div>
        );
      case 'gif':
        // console.log('got image', content)
        // return <Video />;
        return (
          <div className="rcw-message-text" style={{ cursor: 'pointer' }}>
            <p>
              <Image
                src={content}
                alt="this is picture"
                className="rcw-message-img"
              />
            </p>
            <p className="message-time">{renderTime()}</p>
          </div>
        );
      case 'product':
        const { images } = JSON.parse(content);
        return (
          <div className="rcw-message-text">
            <p>
              <img
                src={images[0]}
                alt="this is picture"
                className="rcw-message-img"
              />
            </p>
            {/* <p>Tôi cần tư vấn</p> */}
          </div>
        );
      case 'sticker':
        // console.log('got sticker', content)
        return (
          <>
            <div className="rcw-message-sticker">
              <img
                src={content}
                alt="this is sticker"
                className="rcw-message-sticker"
              />
            </div>
            <p className="message-time">{renderTime()}</p>
          </>
        );
      case 'video':
        return (
          <Video
            customStyle={{
              alignSelf: `${
                messageClass === 'rcw-client' ? 'flex-end' : 'flex-start'
              }`,
            }}
            src={content}
            time={renderTime()}
          />
        );
      case 'emoji':
        return (
          <div className="rcw-message-text">
            <p style={{ fontSize: '32px' }}>{content}</p>
            <p className="message-time">{renderTime()}</p>
          </div>
        );
      case 'location':
        try {
          const coords = JSON.parse(content);
          return (
            <>
              <p>
                <a
                  target="_blank"
                  href={`https://google.com/maps?q=${coords.lat},${coords.lng}`}
                  rel="noreferrer"
                >
                  Vị trí của tôi
                </a>
              </p>
              <p className="message-time">{renderTime()}</p>
            </>
          );
        } catch (e) {
          return <p style={{ color: 'red' }}>Không thể nhận Vị Trí</p>;
        }
    }
  };
  const renderTime = () => {
    let { createdAt } = props.message;
    // console.log(moment(createdAt.toDate()).format('h:mm a'));
    return moment(createdAt)
      .calendar()
      .replace('Today at ', '')
      .replace('Yesterday at ', 'Hôm qua ');
  };
  const shouldRenderSeenState = () => {
    console.log(
      `shouldRenderSeenState: ${props?.message?.id}, ${
        props.isLastMsg
      }, ${isChecked}, ${props.isLastMsg && !isChecked}`
    );
    if (!props?.message?.id) return '';
    if (props.isLastMsg) {
      console.log('========= Checking =========');
      const { from, seen } = lastMsgVar();
      if (from.uid === props.currentUser && seen) {
        return <span className="seen-state">Admin đã xem</span>;
      } else if (from.uid !== props.currentUser) {
        console.log('preparing seen message of admin');
        setSeenMsg(props.currentUser, props.message.id);
      }
      // const isSeen = await getSeenState(props.currentUser, props.message.id);
      // console.log('state');
      // console.log(isSeen, props.isLastMsg);
      // setSeenState(true);
      // setChecked(true); // prevent infinity loop
    }
    return '';
  };
  // shouldRenderSeenState();
  return (
    <>
      <div className="rcw-message">
        <div className={`${messageClass}`}>
          {renderMessageHelper()}
          {/* {isShowSeen && <span className="seen-state">Seen</span>} */}
          {shouldRenderSeenState()}
        </div>
      </div>
    </>
  );
};

export default Message;
/**
 *  First: we have to check is the last msg is our msg or from admin
 *  - True: Check state is seen or not
 *  - False: do nothing
 *
 *
 */
