// import React from 'react';

// function ChatMessage(props) {
//     const { text, uid, photoURL } = props.message;
  
//     //const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
//     const messageClass = 'received';
//     return (<>
//       <div className={`message ${messageClass}`}>
//         <img src={photoURL || 'https://picsum.photos/200'} />
//         <p>{text}</p>
//       </div>
//     </>)
//   }


// const ChatListUser = ()=>{
//     const dummy = useRef();
//     console.log(uid)
//     const userRef = firestore.collection('users');
//     const query = userRef.orderBy('createdAt').limit(25);

//     const [messages] = useCollectionData(query, { idField: 'id' });


//     // const sendMessage = async (e) => {
//     //     e.preventDefault();

//     //     //const { uid, photoURL } = auth.currentUser;

//     //     await messagesRef.add({
//     //         text: formValue,
//     //         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     //         uid: uid,
//     //         photoURL: "https://api.adorable.io/avatars/23/abott@adorable.png"
//     //     })

//     //     setFormValue('');
//     //     dummy.current.scrollIntoView({ behavior: 'smooth' });
//     // }

//     return (
//         <div className="chat__box">
//             <div className="chat__box--content">

//                 {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

//                 <span ref={dummy}></span>

//             </div>
//         </div>
//     )

// }

// export default ChatListUser;