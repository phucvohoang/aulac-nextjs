import React, { useState } from 'react';
import {
  useQuery,
  gql,
  useLazyQuery,
  useMutation,
  useSubscription,
} from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/resolvers';
import { CUSTOMER_LIST_ORDERS } from '../../graphql/queries';
import Chat from './Chat.component';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight } from 'lodash';
import { getItem, setItem } from '../../util/localStorage';
import { notification } from 'antd';
const CUSTOMER_GET_PROFILE = gql`
  query CustomerGetProfile {
    customerGetProfile {
      _id
      name
      email
      phone
      address {
        addressNo
      }
    }
  }
`;

const CUSTOMER_SEARCH_CUSTOMER = gql`
  query CustomerSearchCustomer(
    $keyword: String!
    $page: Int
    $perPage: Int
    $orderBy: QueryCustomerOrderBy
    $orderDir: QueryOrderByDirection
  ) {
    customerSearchCustomer(
      keyword: $keyword
      page: $page
      perPage: $perPage
      orderBy: $orderBy
      orderDir: $orderDir
    ) {
      docs {
        _id
        name
        email
      }
    }
  }
`;
const UPLOAD_CHAT_MEDIA = gql`
  mutation UploadChatMedia($file: Upload!) {
    uploadChatMedia(file: $file)
  }
`;
// const ProfileContainer = props => {

//     return <p>Im Profile Container</p>
// }

const NEW_CHAT = gql`
  subscription SubscribeNewChatMessage {
    subscribeNewChatMessage {
      from {
        _id
        name
        email
      }
      to {
        _id
        name
        email
      }
      content
      createdAt
      type
    }
  }
`;
const WrapperLogin = (props) => {
  const { data, loading, error } = useQuery(CUSTOMER_GET_PROFILE);
  const [listOrders, setListOrders] = useState([]);
  let {
    data: datasub,
    loading: loadSub,
    error: errSub,
  } = useSubscription(NEW_CHAT, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(
        '============= onSubscriptionData Message =================='
      );
      console.log(subscriptionData);
      const newNoti = subscriptionData.data.subscribeNewChatMessage;
      // console.log(newNoti,lastNotification);
      const getLastNotification = getItem('notificationFromDriver');
      const lastNotification = getLastNotification
        ? getLastNotification[newNoti.from._id]
        : false;
      console.log(lastNotification);
      if (!lastNotification) {
        // setLastNotification();
        if (newNoti?.from?.name !== 'Admin') {
          console.log('in if driver subscription');
          setPopChatStatus(true);
          setItem('notificationFromDriver', {
            ...getLastNotification,
            [newNoti.from._id]: newNoti.from,
          });
          notification.success({
            message: 'Có 1 tin nhắn mới từ driver',
          });
        }
      } else {
        delete getLastNotification[newNoti.from._id];
        setItem('notificationFromDriver', getLastNotification);
      }
    },
  });
  const [showPopChat, setPopChatStatus] = useState(false);
  const [getOrders] = useLazyQuery(CUSTOMER_LIST_ORDERS, {
    onCompleted: (data) => {
      console.log(data.customerListOrders);
      const list = data.customerListOrders.docs;
      setListOrders(list);
    },
    onError: (e) => {
      console.log(e);
      setListOrders([]);
    },
  });
  const [searchUsers, setSearchUsers] = useState([]);
  const [state, setState] = useState({
    cbUploadSuccess: null,
  });
  const [uploadMedia] = useMutation(UPLOAD_CHAT_MEDIA, {
    onCompleted: (data) => {
      console.log('ok sent completely');
      console.log(data);
      console.log(data.uploadChatMedia);
      state.cbUploadSuccess(data.uploadChatMedia);
    },
    onError: (e) => {
      // console.log('we have error when uploading')
      // console.log(e)
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
  const [search] = useLazyQuery(CUSTOMER_SEARCH_CUSTOMER, {
    onCompleted: (data) => {
      // console.log(data)
      setSearchUsers(data.customerSearchCustomer.docs);
    },
    onError: (e) => {
      // console.log(e)
    },
  });
  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>We have an error</p>;
  }
  if (loadSub) {
    console.log('Load subscription succeess at chat page driver');
  }

  if (errSub) {
    console.log('we have an error on sub at chat page driver');
    console.log(error);
  }
  if (datasub) {
    console.log('Load subscription succeess at chat page driver');
  }

  const { currentUser } = props.user;
  if (currentUser) {
    const isLoggedIn = Object.keys(currentUser).length > 0;
    if (!isLoggedIn) {
      props.history.push('/');
      return;
    }
    const { customerGetProfile: user } = data;
    // console.log(user)
    return (
      <Chat
        {...props}
        uploadImg={uploadMedia}
        listOrders={listOrders}
        getOrders={getOrders}
        uploadMedia={handleUpload}
        search={search}
        isLoggedIn={isLoggedIn}
        user={user}
        searchUsers={searchUsers}
      />
    );
  } else {
    return <p>Loading..</p>;
  }
  // console.log(currentUser);
  // const isLoggedIn = Object.keys(currentUser).length > 0;
};

export default flowRight(graphql(GET_CURRENT_USER, { name: 'user' }))(
  WrapperLogin
);
