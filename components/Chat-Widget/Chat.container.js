import React, { useState } from 'react';
import { gql, useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import Chat from './Chat.component';
import {
  currentUserVar,
  isLoggedInVar,
  isShowPopChatVar,
} from '../../lib/graphql/cache';
import { UPLOAD_CHAT_MEDIA } from '../../lib/graphql/queries';

const pushNewChatMessage = gql`
  query PushNewChatMessage($chatMessageInput: ChatMessageInput!) {
    pushNewChatMessage(chatMessageInput: $chatMessageInput)
  }
`;

const ChatContainer = (props) => {
  // const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const currentUser = useReactiveVar(currentUserVar);
  const isShowPopChat = useReactiveVar(isShowPopChatVar);
  const [state, setState] = useState({
    cbUploadSuccess: null,
    typeFile: '',
  });

  const [showPopChat, setPopChatStatus] = useState(false);
  const [pushMessage] = useLazyQuery(pushNewChatMessage);
  const [uploadMedia] = useMutation(UPLOAD_CHAT_MEDIA, {
    onCompleted: (data) => {
      // //console.log('ok sent completely')
      // //console.log(data.uploadChatMedia);
      state.cbUploadSuccess(data.uploadChatMedia, state.typeFile);
    },
    onError: (e) => {
      // //console.log('we have error when uploading')
      // //console.log(e)
    },
  });
  const updateStatePopChat = (state) => {
    isShowPopChatVar(state);
  };
  const handleUpload = (file, cb) => {
    const type = file.type.startsWith('image') ? 'image' : 'video';
    setState({ ...state, cbUploadSuccess: cb, typeFile: type });
    uploadMedia({
      variables: {
        file,
      },
    });
  };

  return (
    <Chat
      showPopChat={showPopChat}
      setPopChatStatus={updateStatePopChat}
      pushMessage={pushMessage}
      isLoggedIn={isLoggedIn}
      uploadMedia={handleUpload}
      user={currentUser}
      isShowPopChat={isShowPopChat}
      {...props}
    />
  );
};

export default ChatContainer;
