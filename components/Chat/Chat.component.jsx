import React from 'react';
import { Collapse } from 'antd';
import ChatBox from './ChatBox.component';
import { firestore } from "../../firebase/firebase.util";
const { Panel } = Collapse;
class Chat extends React.Component {
    componentDidMount() {
        
        if(this.props.isLoggedIn){
            const uid = this.props.user.info._id || this.props.user.info.email;
            firestore
                .collection("messages")
                .doc(uid)
                .collection("conversations")
                .onSnapshot(snapshot => {
                    const { panel,setShowPanel } = this.props;
                    snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        if(panel !== '1'){
                            setShowPanel('1')
                        }
                    }
                });
            })
        }
        
    }
    onChange = key => {
        const { panel,setShowPanel } = this.props;
        if(panel === '1'){
            setShowPanel('0')
        }else {
            setShowPanel('1')
        }
    }
    render(){
        const { panel } = this.props;
        return (
            <section className="pop__chat">
            <Collapse activeKey={[panel]} onChange={this.onChange}>
                <Panel style={{backgroundColor: 'goldenrod', color: '#fff'}} header="Chat With Supporter" key="1">
                    {
                        this.props.isLoggedIn ? <ChatBox {...this.props}/> : <p>Xin vui lòng đăng nhập </p>
                    }
                </Panel>
                
            
            </Collapse>
            </section>
        )
    }
    
}

export default Chat;