import React from 'react';
import { MessageBox, Message } from './styled';
import { Image } from 'antd';
import Video from '../../../../components/Chat-Widget/Video';
import moment from 'moment';
const renderMessageHelper = (message) => {
  let { uid, content, type, createdAt, photoURL, messageId } = message;
  // //console.log(moment(createdAt.toDate()).calendar());

  switch (type) {
    case 'text':
      return (
        <div className="rcw-message-text">
          <p>{content}</p>
          <p className="message-time">{renderTime(message)}</p>
        </div>
      );
    case 'image':
      // //console.log('got image', content)
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
          <p className="message-time">{renderTime(message)}</p>
        </div>
      );
    case 'gif':
      // //console.log('got image', content)
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
          <p className="message-time">{renderTime(message)}</p>
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
      // //console.log('got sticker', content)
      return (
        <>
          <div className="rcw-message-sticker">
            <img
              src={content}
              alt="this is sticker"
              className="rcw-message-sticker"
            />
          </div>
          <p className="message-time">{renderTime(message)}</p>
        </>
      );
    case 'video':
      return (
        <Video
          customStyle={{ width: '100%' }}
          src={content}
          time={renderTime(message)}
        />
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
              >
                Vị trí của tôi
              </a>
            </p>
            <p className="message-time">{renderTime(message)}</p>
          </>
        );
      } catch (e) {
        return <p style={{ color: 'red' }}>Không thể nhận Vị Trí</p>;
      }
  }
};
const renderTime = (message) => {
  let { createdAt } = message;
  // //console.log(moment(createdAt.toDate()).format('h:mm a'));
  return moment(createdAt)
    .calendar()
    .replace('Today at ', '')
    .replace('Yesterday at ', 'Hôm qua ');
};
const MessageComp = (props) => {
  const { message, user } = props;
  return (
    <MessageBox isSent={message?.from?.uid === user?._id}>
      <Message isSent={message?.from?.uid === user?._id}>
        {renderMessageHelper(message)}
      </Message>
    </MessageBox>
  );
};

export default MessageComp;
