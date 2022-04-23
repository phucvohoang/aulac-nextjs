
import React from 'react';
import { firestore } from '../../firebase/firebase.util';
import firebase from 'firebase/app'
import { Form, Input, Upload, notification, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';

const { Option } = Select;
class Chat extends React.Component {

    
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            currentUser: props.user,
            listFriends: [],
            currentChat: null,
            listMessages: [],
            isSearch: false,
            orderStatus: "requested"
        }
    }
    componentDidMount(){
        // const messaging = firebase.messaging();
        // messaging.getToken({vapidKey: 'BM2PJVvurqcwC0bQLRshtPnEH9aoLan6WBmrZ1xF1K9Pgpe7faBgJZcJCa_MXIpiyymZAiMJij8B5nP9DtsY23w'})
        // Get registration token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        //console.log(this.props.user)
        this.fetchFriend()
        this.props.getOrders({
            variables: {
                shippingStatus: [this.state.orderStatus],
                page:1,
                perPage: 10
            }
        })

    }

    nomarlizeDataDriver = () => {
        const { listOrders } = this.props;
        const res = []
        if(listOrders.length > 0){
            for(let i = 0; i < listOrders.length; i++){
                const { _id, driver, orderCode } = listOrders[i];
                if(driver){
                    const { avatar, name, email } = driver;
                    res.push({
                        avatar,
                        email,
                        name,
                        orderCode,
                        orderID: _id,
                        _id: driver._id
                    })
                }
                
            }
            
        }
        return res;
    }
    fetchFriend = async () => {
        const existingUser = await firestore.collection('friends')
        .where('uidTo', "==", this.state.currentUser._id)
        .get();
        if(existingUser.size > 0){
            let friends = []
            existingUser.forEach(doc => {
                // console.log(doc.id, " => ", doc.data());
                friends.unshift({
                    ...doc.data()
                })
            })
            this.setState(()=>({
                listFriends: friends,
                isSearch: false
            }))
        }
    }
    scrollToBottom = () => {
        const boxChat = document.querySelector('.chat__page__right--body');
        boxChat.scrollTop = boxChat.scrollHeight;
    }
    handleSubmit = async values => {
        // console.log(values);
        const { currentChat, currentUser } = this.state;
        if(currentChat){
            const { _id } = currentChat
            const messagePayload = {
                content: values.msg,
                type: 'text',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                photoUrl: '',
                uid: this.state.currentUser._id,
                uidTo: _id
            }
            // console.log(messagePayload)
            try{
                let groupId = '';
                const sorted = currentUser._id.localeCompare(_id)
                if(sorted === -1 || sorted === 0){
                    groupId = `${currentUser._id}-${_id}`
                }else {
                    groupId = `${_id}-${currentUser._id}`
                }
                console.log(groupId)
                await firestore.collection('messages1')
                            .doc(`${groupId}`)
                            .collection('conversations')
                            .add(messagePayload);
                this.formRef.current.resetFields();
                this.scrollToBottom()
            }catch (e) {
                // console.log(e)
                console.log(e)
            }
            
        }
        
    }
    handleSendChatImage = async (url) => {
        const { currentChat, currentUser } = this.state;
        
        if(currentChat){
            const { _id: uid } = currentChat
            
            const messagePayload = {
                content: `${url}`,
                type: 'image',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                photoUrl: '',
                uid: this.state.currentUser._id,
                uidTo: uid
            }
            try{
                let groupId = this.getGroupNames()
                console.log(groupId);
                console.log(messagePayload)
                await firestore.collection('messages1')
                            .doc(`${groupId}`)
                            .collection('conversations')
                            .add(messagePayload);
                notification[`success`]({
                    message: 'Send Image Success',
                })
                // console.log(url)
                this.scrollToBottom()
            }catch (e) {
                console.log(e)
                console.log("========== Could not Upload Image to Firebase ================")
            }
            
        }
    }
    renderContenMsg = (msg) => {
        let { type, content } = msg
        // console.log(content)
        //content = JSON.parse(content)
        switch(type) {
          case 'image': 
            return <img className="image__message" src={content} alt="message" />
          case 'text':
              
            return <p>{content}</p>
          case 'product':
            // content = JSON.parse(content)
            return (
              <div className="product__message">
                <img style={{width: '50%'}} className="image__message" src={ content.images ? content.images[0] : ''} alt="message" />
                <div className="product__message--infor">
                  <p>{content.name}</p>
                  <p>{content.salePrice}</p>
                </div>
              </div>
            )
          default:
            return <p>{content}</p>
        }
    }
    chooseChatWith = async (friend, isFriend) => {
        const { currentUser } = this.state;
        const { uid } = friend;
        if(isFriend){
            let groupId = '';
            const sorted = currentUser._id.localeCompare(uid)
            if(sorted === -1 || sorted === 0){
                groupId = `${currentUser._id}-${uid}`
            }else {
                groupId = `${uid}-${currentUser._id}`
            }
            //console.log(`${uid}-${uidTo}`)
            const listMessages = await firestore.collection('messages1')
                                .doc(`${groupId}`)
                                .collection('conversations')
                                .get();
            // if(listMessages.size > 0){
                
            // }
            firestore.collection('messages1')
                    .doc(`${groupId}`)
                    .collection('conversations')
                    .orderBy("createdAt")
                    .onSnapshot(snapshot => {
                        const msgs = []
                        snapshot.forEach(doc => {
                            msgs.push({
                                ...doc.data()
                            })
                        })
                        this.setState(()=>({
                            currentChat: friend,
                            listMessages: msgs
                        }))
                    })
        }else {
            const existingUser = await firestore.collection('friends')
                    .where('uid', "==", friend._id)
                    .where('uidTo', "==", currentUser._id)
                    .get();
            if(existingUser.size === 0){
                await firestore.collection('friends')
                        .add({
                            avatar: 'https://aulac-media.s3.ap-southeast-1.amazonaws.com/images/avatars/5fc73e0eb3d7ea758151f5cf-1607964767871.jpg',
                            deviceToken: '',
                            email: friend.email,
                            name: friend.name,
                            uid: friend._id,
                            uidTo: currentUser._id,
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        })
                await firestore.collection('friends')
                    .add({
                        avatar: 'https://aulac-media.s3.ap-southeast-1.amazonaws.com/images/avatars/5fc73e0eb3d7ea758151f5cf-1607964767871.jpg',
                        deviceToken: '',
                        email: currentUser.email,
                        name: currentUser.name,
                        uid: currentUser._id,
                        uidTo: friend._id,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                this.fetchFriend()
            }else {
                let groupId = '';
                const sorted = currentUser._id.localeCompare(uid)
                if(sorted === -1 || sorted === 0){
                    groupId = `${currentUser._id}-${uid}`
                }else {
                    groupId = `${uid}-${currentUser._id}`
                }
                firestore.collection('messages1')
                    .doc(`${groupId}`)
                    .collection('conversations')
                    .orderBy("createdAt")
                    .onSnapshot(snapshot => {
                        const msgs = []
                        snapshot.forEach(doc => {
                            // console.log(doc.id, " => ", doc.data());
                            msgs.push({
                                ...doc.data()
                            })
                        })
                        // console.log(msgs);
                        this.setState(()=>({
                            currentChat: friend,
                            listMessages: msgs
                        }))
                    })
            }
        }
        
        
    }
    renderMessages = () => {
        const { listMessages, currentUser } = this.state;
        // console.log(currentUser)
        if(listMessages.length > 0){
            return listMessages.map(msg => {
                // console.log(msg.uid, currentUser._id)
                return (<div className={`message ${msg.uid !== currentUser._id ? 'received' : 'sent'}`}>
                            <div className="msg">{this.renderContenMsg(msg)}</div>
                        </div>)
            })
        }else {
            return <li>No Messages</li>
        }
    }
    renderListChatUser = () => {
        const { listFriends, currentChat, isSearch } = this.state;
        if(isSearch){
            if(this.props.searchUsers.length > 0){
                return this.props.searchUsers.map(friend => {
                    return (
                    <li onClick={()=>{this.chooseChatWith(friend, friend.uid)}} className={`chat-link-signle ${currentChat?.uid === friend.uid ? 'active' : ''}`}>
                        <div className="chat__content--user">
                            <div className="author-figure">
                                    <img src={friend.avatar} alt="" />
                            </div>
                            <div className="author-info">
                                <p>{friend.email}</p>
                                <p className="orderID">Mã Đơn Hàng: #17</p>
                                
                            </div>
                        </div>
                    </li>)
                })
            }else {

            }
        }else{
            if(listFriends.length > 0){
                return listFriends.map(friend => {
                    return (
                    <li onClick={()=>{this.chooseChatWith(friend, friend.uid)}} className={`chat-link-signle ${currentChat?.uid === friend.uid && 'active'}`}>
                        <div className="chat__content--user">
                            <div className="author-figure">
                                    <img src={friend.avatar} alt="" />
                            </div>
                            <div className="author-info">
                                <p>{friend.email}</p>
                                <p className="orderID">Mã Đơn Hàng: #17</p>
                                
                            </div>
                        </div>
                    </li>)
                })
            }else {
                return <li>No Users</li>
            }
        }
        
    }
    getGroupNames = () => {
        let groupID = '';
        const { currentChat, currentUser } = this.state;
        const sorted = currentUser._id.localeCompare(currentChat._id);
        if(sorted === -1 || sorted === 0){
            groupID = `${currentUser._id}-${currentChat._id}`
        }else {
            groupID = `${currentChat._id}-${currentUser._id}`
        }
        return groupID;
    }
    getGroupChat = (friend) => {
        let groupId = '';
        // console.log(friend)
        let uid = friend._id;
        const { currentUser } = this.state;
        const sorted = currentUser._id.localeCompare(uid)
        if(sorted === -1 || sorted === 0){
            groupId = `${currentUser._id}-${uid}`
        }else {
            groupId = `${uid}-${currentUser._id}`
        }
        // console.log(groupId)
        firestore.collection('messages1')
            .doc(`${groupId}`)
            .collection('conversations')
            .orderBy("createdAt")
            .onSnapshot(snapshot => {
                const msgs = []
                snapshot.forEach(doc => {
                    // console.log(doc.id, " => ", doc.data());
                    msgs.push({
                        ...doc.data()
                    })
                })
                console.log(msgs)
                // console.log(msgs);
                this.setState(()=>({
                    currentChat: friend,
                    listMessages: msgs
                }))
            })
    }
    chooseDriverToChat = async (driver) => {
        const { currentUser } = this.state;
        // console.log(driver)
        // Checking whether or not driver and user has talked before ?
        const existingUser = await firestore.collection('friends')
                    .where('uid', "==", driver._id)
                    .where('uidTo', "==", currentUser._id)
                    .get();
            if(existingUser.size === 0){
                // they havent talked
                // create friend relationship
                await firestore.collection('friends')
                        .add({
                            avatar: 'https://aulac-media.s3.ap-southeast-1.amazonaws.com/images/avatars/5fc73e0eb3d7ea758151f5cf-1607964767871.jpg',
                            deviceToken: '',
                            email: driver.email,
                            name: driver.name,
                            uid: driver._id,
                            uidTo: currentUser._id,
                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                        })
                await firestore.collection('friends')
                    .add({
                        avatar: 'https://aulac-media.s3.ap-southeast-1.amazonaws.com/images/avatars/5fc73e0eb3d7ea758151f5cf-1607964767871.jpg',
                        deviceToken: '',
                        email: currentUser.email,
                        name: currentUser.name,
                        uid: currentUser._id,
                        uidTo: driver._id,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                this.getGroupChat(driver)
            }else {
                this.getGroupChat(driver)
                // let groupId = '';
                // const sorted = currentUser._id.localeCompare(uid)
                // if(sorted === -1 || sorted === 0){
                //     groupId = `${currentUser._id}-${uid}`
                // }else {
                //     groupId = `${uid}-${currentUser._id}`
                // }
                // firestore.collection('messages1')
                //     .doc(`${groupId}`)
                //     .collection('conversations')
                //     .orderBy("createdAt")
                //     .onSnapshot(snapshot => {
                //         const msgs = []
                //         snapshot.forEach(doc => {
                //             // console.log(doc.id, " => ", doc.data());
                //             msgs.push({
                //                 ...doc.data()
                //             })
                //         })
                //         // console.log(msgs);
                //         this.setState(()=>({
                //             currentChat: friend,
                //             listMessages: msgs
                //         }))
                //     })
            }
    }
    renderListDriver = () => {
        const listDriver = this.nomarlizeDataDriver();
        const { currentChat } = this.state;
        if(listDriver.length > 0){
            return listDriver.map(driver => {
                return (
                    <li onClick={()=>{this.chooseDriverToChat(driver)}} className={`chat-link-signle ${currentChat?._id === driver._id && 'active'}`}>
                        <div className="chat__content--user">
                            <div className="author-figure">
                                    <img src={driver.avatar} alt="" />
                            </div>
                            <div className="author-info">
                                <p>{driver.name}</p>
                                <p className="orderID">{`Mã Đơn Hàng: #${driver.orderCode}`}</p>
                                
                            </div>
                        </div>
                    </li>) 
            })
        }else {
            return <li style={{width:"100%", padding: "0rem 2rem"}}>Đơn hàng bạn chưa được nhận bởi tài xế</li>
        }
    }
    handleSearchUser = (values) => {
        // console.log(values)
        this.props.search({
            variables: {
                keyword: values.email
            }
        });
        this.setState(()=>({isSearch: true}))
    }
    handleUploadImage = info => {
        // console.log(info.file.originFileObj);
        const file = info.file.originFileObj;
        console.log(file)
        this.props.uploadMedia(file, this.handleSendChatImage)
        // this.props.uploadImg({
        //     variables: {
        //         file
        //     }
        // }).then(data => {
        //     console.log("======== Upload success =============")
        //     console.log(data);
        //     this.handleSendChatImage()
        // }).catch(e => {
        //     console.log("Could not upload image")
        // })
        
    }

    toogleList = () => {
        const listUser = document.querySelector(".chat__page__left");
        listUser.classList.toggle('active');
    }
    onSelectChange = value => {
        console.log(value)
        this.props.getOrders({
            variables: {
                shippingStatus: [value],
                page: 1,
                perPage: 10
            }
        });
        this.setState(()=>({orderStatus: value}))
    }
    render(){
        // console.log(this.props.searchUsers);
        const propsUpload = {
            name: 'file',
            showUploadList: false,
            //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
              authorization: 'authorization-text',
            },
            
            customRequest: ({onSuccess, onError, file}) => {
              
            }
          };
        return (
            <div className="chat__page">
                
                <div className="chat__page__left">
                    <div className="chat__page__right--title">
                        <h2 className="name">Tài Xế</h2>
                    </div>
                    <div className="chat__page__left--form">
                        <p style={{width:"100%", padding: "0rem 2rem"}}>Trạng Thái Đơn Hàng</p>
                        <div style={{width:"100%", padding: "1rem 2rem"}} >
                        <Select style={{width:"100%"}} value={this.state.orderStatus} onChange={this.onSelectChange}>
                            <Option value="requested">Đơn Hàng Đang Được Lấy</Option>
                            <Option value="packed">Đơn Đã Được Đóng Gói</Option>
                            <Option value="shipped">Đơn Đang Giao</Option>
                            <Option value="delivered">Đơn Đã Giao</Option>
                        </Select>
                        </div>
                    </div>
                    <ul>
                        {/* {this.renderListChatUser()} */}
                        {this.renderListDriver()}
                    </ul>
                </div>
                <div className="chat__page__right">
                    <div className="chat__page__right--title">
                        
                        <h2 className="name">{this.state.currentChat && this.state.currentChat.name}</h2>
                        <div className="toogle__list" onClick={this.toogleList}>
                            <FeatherIcon icon="menu" size={12} />
                        </div>
                    </div>   
                    <div className="chat__page__right--body">
                        {/* <li className="message received">
                            <p className="msg">lorem ipsum on received</p>
                        </li>
                        <li className="message sent">
                            <p className="msg">lorem ipsum</p>
                        </li> */}
                        {this.renderMessages()}
                    </div>  
                    <div className="chat__page__right--form">
                        <div className="chat__page__right--form--input">
                            <Form style={{width: '100%'}} ref={this.formRef} onFinish={this.handleSubmit} style={{width:"100%"}}>
                                <Form.Item name="msg">
                                    <Input onFocus={this.scrollToBottom} className="" placeholder="Enter Message..." />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="chat__page__right--form--image">
                            <Upload {...propsUpload} onChange={this.handleUploadImage}>
                                <FeatherIcon icon="camera" size={18} /> 
                            </Upload>
                        </div>

                    </div>  
                </div>
            </div>
        )
    }
}

export default Chat;