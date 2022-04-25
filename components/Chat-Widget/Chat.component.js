import React, { Component } from 'react';
// import { Widget, addResponseMessage, addUserMessage, renderCustomComponent } from 'react-chat-widget';
import { notification } from 'antd';
import ChatBox from './Chat-Body.component';
// import './custom-chat.css';
import FeatherIcon from 'feather-icons-react';
// class Image extends Component {
//     render() {
//       return <Button>Text</Button>
//     }
//   }

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openChatBox: false,
    };
  }
  handleToogleChatBox = () => {
    if (this.props.isLoggedIn) {
      const { showPopChat, setPopChatStatus, isShowPopChat } = this.props;
      // Case pop chat is showed when got new messaged
      if (isShowPopChat && !this.state.openChatBox) {
        setPopChatStatus(false);
      } else {
        // Case pop chat is showed when user clicked open popchat
        this.setState((prevState) => ({ openChatBox: !prevState.openChatBox }));
      }
    } else {
      this.showPopup();
    }
  };
  handleNewUserMessage = (msg) => {
    //   console.log(`New message is coming:${msg}`)
  };
  getCustomLauncher = (handleToggle) => (
    <button onClick={handleToggle}>This is my launcher component!</button>
  );
  showPopup = () => {
    notification.warning({
      message: 'Xin vui lòng đăng nhập',
    });
  };
  render() {
    //  console.log(this.props.showPopChat)
    return (
      // <Widget
      //    handleNewUserMessage={this.handleNewUserMessage}
      // />
      <div className="rcw-widget-container">
        {
          // this.state.openChatBox && (this.props.isLoggedIn ?<ChatBox {...this.props}/> : this.showPopup())

          this.props.isLoggedIn &&
            (this.props.isShowPopChat || this.state.openChatBox) && (
              <ChatBox {...this.props} />
            )
        }
        <button
          onClick={this.handleToogleChatBox}
          type="button"
          className="rcw-launcher rcw-hide-sm"
          aria-controls="rcw-chat-container"
        >
          <span className="rcw-badge"></span>
          {this.state.openChatBox ? (
            <FeatherIcon icon="x" style={{ color: '#fff', marginBottom: 0 }} />
          ) : (
            <FeatherIcon
              icon="message-square"
              style={{ color: '#fff', marginBottom: 0 }}
            />
          )}
        </button>
      </div>
    );
  }
}

export default Chat;
