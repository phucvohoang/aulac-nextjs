import React from 'react';
import { useMutation, gql, useLazyQuery, useReactiveVar } from '@apollo/client';
import LoginRegister from './LoginRegister.component.jsx';
import { GET_WISHLIST, LOG_IN } from '../../lib/graphql/queries';
import { notification } from 'antd';
import {
  handleSetLogOutState,
  handleSetLoggedInState,
  initWishList,
} from '../../lib/graphql/resolvers/utils';
import { isLoggedInVar, currentUserVar } from '../../lib/graphql/cache';
import { registerTokenAndSubscribe } from '../../firebase/firebase.util.js';
// const SET_CURRENT_USER = gql`
//   mutation SetCurrentUser($user: User!) {
//     SetCurrentUser(user: $user) @client
//   }
// `;
const InitWishList = gql`
  mutation InitWishList($list: [Product!]!) {
    InitWishList(list: $list) @client
  }
`;

const REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    registerV2(registerInput: $registerInput) {
      userId
    }
  }
`;
// const GET_CURRENT_USER = gql`
//     query GetCurrentUser {
//         currentUser @client
//     }
// `;

const LoginRegisterContainer = (props) => {
  // const { data, loading } = useQuery(GET_CURRENT_USER);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const currentUser = useReactiveVar(currentUserVar);
  // const [initWishList] = useMutation(InitWishList);
  const [getWishList] = useLazyQuery(GET_WISHLIST, {
    onCompleted: (data) => {
      initWishList(data.customerGetWishlist);
    },
  });
  // const [setCurrentUser] = useMutation(SET_CURRENT_USER);
  const [login] = useMutation(LOG_IN);
  const [register] = useMutation(REGISTER, { fetchPolicy: 'no-cache' });
  const handleSetUser = (user, cb) => {
    handleSetLogOutState();
    cb();
    // setCurrentUser({ variables: { user } }).then((user) => {
    //   //// console.log('set currentuser successfully');
    //   cb();
    // });
  };
  const handleLogin = (email, password) => {
    return login({ variables: { loginInput: { email, password } } })
      .then((res) => {
        // // console.log("Login Success");
        const data = res.data.login;
        const user = {
          jwt: data.jwt,
          // info: data.user,
          ...data.user,
        };
        handleSetLoggedInState(user);
        registerTokenAndSubscribe(user);
        getWishList();
      })
      .catch((e) => {
        notification.error({
          message: 'Đăng Nhập Thất Bại',
        });
      });
  };

  // console.log('============ New Data coming in ============');
  // console.log(isLoggedIn, currentUser);
  return (
    <LoginRegister
      {...props}
      // registerMutation={handleRegister}
      setUser={handleSetUser}
      register={register}
      login={handleLogin}
      isLoggedIn={isLoggedIn}
      user={currentUser}
    />
  );
};

export default LoginRegisterContainer;
