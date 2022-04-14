import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase/firebase.util";
import { Upload } from 'antd';
import FeatherIcon from 'feather-icons-react';
import "./customs.scss";
import 'react-chat-widget/lib/styles.css'; 
function ChatMessage(props) {
  //const { text, uid, photoURL } = props.message;
  let {uid, content, type, createdAt, photoURL} = props.message;
  // const messageClass = uid === props.currentUser ? "sent" : "received";
  const messageClass = uid === props.currentUser ? "rcw-client" : "rcw-response";
  //const messageClass = 'received';
  switch(type) {
    case 'text': 
      return (
        <>
          {/* <div className={`message ${messageClass}`}>
            <img className="avatar" src={photoURL ? photoURL : "https://picsum.photos/200"} />
            <p className="normal__text">{content}</p>
          </div> */}
          <div className="rcw-message">
            <div className={`${messageClass}`}>
               <div className="rcw-message-text">
                  <p>Welcome to this awesome chat!</p>
               </div>
               <span className="rcw-timestamp">03:30</span>
            </div>
         </div>
        </>
      )
    case 'image': 
      return (
        <>
          {/* <div className={`message ${messageClass}`}>
            <img className="avatar"  src={photoURL ? photoURL : "https://picsum.photos/200"} />
            <div className="message__image">
              <img src={content} alt="image" />
            </div>
          </div> */}
          <div className="rcw-message">
            <div className={`${messageClass}`}>
               <div className="rcw-message-text">
                  <p><img src={content} alt="this is picture" className="rcw-message-img" /></p>
               </div>
               <span className="rcw-timestamp">03:30</span>
            </div>
         </div>
        </>
      )
    case 'product': 
        content = JSON.parse(content)
      return (
        <>
          <div className={`message ${messageClass}`}>
            <img className="avatar"  src={photoURL ? photoURL : "https://picsum.photos/200"} />
            <div className="product__message">
              <img src={content.images[0]} alt="image" />
              <div className="product__info">
                <p className="product__name">{content.name}</p>
                <p className="product__price text-center">{content.salePrice}</p>
              </div>
             
            </div>
           

            
          </div>
        </>
      )
    default:
      return (
        <>
          <div className={`message ${messageClass}`}>
            <img className="avatar" src={photoURL ? photoURL : "https://picsum.photos/200"} />
            <p className="normal__text">{content}</p>
          </div>
        </>
      )
  }
}

const ChatBox = (props) => {
  const dummy = useRef();
  // const [messages, setMessages] = useState([])
  const uid = props.user.info._id || props.user.info.email;
  console.log(uid);
  
  const email = props.user.info.email;
  const [formValue, setFormValue] = useState("");
  //console.log(uid)
  const messagesRef = firestore
    .collection("messages")
    .doc(uid)
    .collection("conversations");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id",  });
  
  
  // const messages = [
  //   {
  //     uid: '1',
  //     type: 'image',
  //     content: 'https://aulacshop.com/uploads/img/1595489555_kho-ga-la-chanh-200g--goi.jpg'
  //   },
  //   {
  //     uid: '1',
  //     type: 'product',
  //     content: {
  //       images: ['https://aulacshop.com/uploads/img/1595489555_kho-ga-la-chanh-200g--goi.jpg'],
  //       name: 'phuc-1',
  //       salePrice: 56000
  //     }
  //   }
  // ]
  const propsUpload = {
    name: 'file',
    showUploadList: false,
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    // listType: 'picture-card',
    
    customRequest: ({onSuccess, onError, file}) => {
      
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setFormValue(value);
  };
  const handleSendChatImage = async (url) => {
    firestore
      .collection("users")
      .add({
        uid,
        email,
      })
      .then(async () => {
        await messagesRef.add({
          content: `${url}`,
          type: 'image',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoUrl: ''
        });

        setFormValue("");
        dummy.current.scrollIntoView({ behavior: "smooth" });
      });
  }
  const sendMessage = async (e) => {
    e.preventDefault();
    
    firestore
      .collection("users")
      .add({
        uid,
        email,
      })
      .then(async () => {
        await messagesRef.add({
          content: formValue,
          type: 'text',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoUrl: ''
        });
        props.pushMessage({
          variables: {
            chatMessageInput: {
              from:{
                  _id: "5fe02ab3104cfb2426494fa3",
                  name: "phuc-4-update",
                  email: "phuc4@gmail.com"
              },
              to: {
                _id: "5faa75cb3452561a3f6463c8",
                name: "Admin",
                email:""
              },
              createdAt: "2021-01-01",
              content:`${formValue}`,
              type: "text"
            }
          }
        })
        setFormValue("");
        dummy.current.scrollIntoView({ behavior: "smooth" });
      });
  };

  const handleUploadImage = (info)=>{
    const file = info.file.originFileObj;
    props.uploadMedia(file, handleSendChatImage)
  }

  return (
    // <div className="chat__box">
    // <div class="rcw-widget-container">
    // <div class="rcw-conversation-container" 
    // aria-live="polite"
    // >
    <div id="messages" className="rcw-messages-container">
      <div className="chat__box--content">
        {messages &&
          messages.map((msg) => (
            <ChatMessage currentUser={uid} key={msg.id} message={msg} />
          ))}

        <span ref={dummy}></span>
      </div>

      <form onSubmit={sendMessage} className="chat__box--form">
        <input
          className="input__message"
          value={formValue}
          onChange={handleChange}
          placeholder="Type Message"
        />
        <div className="action__form">
          <div className="action__form--image">
              <Upload {...propsUpload} onChange={handleUploadImage}>
                  <FeatherIcon icon="camera" size={18} /> 
              </Upload>
          </div>
          <div>
            <button className="button__message" type="submit" disabled={!formValue}>
              Send
            </button>
          </div>
          
        </div>
        
      </form>
    </div>
    // </div>
    // </div>
  );
};

export default ChatBox;
