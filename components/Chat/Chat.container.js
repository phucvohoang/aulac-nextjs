import React, { useState } from 'react';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import Chat from './Chat.component';
const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client
  }
`;
const UPLOAD_CHAT_MEDIA = gql`
  mutation UploadChatMedia($file: Upload!) {
    uploadChatMedia(file: $file)
  }
`;
const pushNewChatMessage = gql`
  query PushNewChatMessage($chatMessageInput: ChatMessageInput!) {
    pushNewChatMessage(chatMessageInput: $chatMessageInput)
  }
`;
const ChatContainer = (props) => {
  const { data, loading, error, subscribeToMore } = useQuery(GET_CURRENT_USER);
  const [state, setState] = useState({
    cbUploadSuccess: null,
  });
  const [pushMessage] = useLazyQuery(pushNewChatMessage);
  const [uploadMedia] = useMutation(UPLOAD_CHAT_MEDIA, {
    onCompleted: (data) => {
      //console.log('ok sent completely')
      //console.log(data.uploadChatMedia);
      state.cbUploadSuccess(data.uploadChatMedia);
    },
    onError: (e) => {
      //console.log('we have error when uploading')
      //console.log(e)
    },
  });
  const handleUpload = (file, cb) => {
    setState({ ...state, cbUploadSuccess: cb });
    uploadMedia({
      variables: {
        file,
      },
    });
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  const { currentUser } = data;
  //console.log(currentUser)
  const isLoggedIn = Object.keys(currentUser).length > 0;
  return (
    <Chat
      pushMessage={pushMessage}
      isLoggedIn={isLoggedIn}
      uploadMedia={handleUpload}
      user={currentUser}
      {...props}
    />
  );
};

export default ChatContainer;
