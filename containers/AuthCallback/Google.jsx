import React, { useEffect, useState } from 'react';
import { useMutation, gql, useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_WISHLIST } from '../../lib/graphql/queries';
import {
  handleSetLoggedInState,
  initWishList,
} from '../../lib/graphql/resolvers/utils';
import { isLoggedInVar, currentUserVar } from '../../lib/graphql/cache';
import { registerTokenAndSubscribe } from '../../firebase/firebase.util';
//rinaishiharaxxx@gmail.com ,
//RinaIshihara762513
/*
#state=google&access_token=ya29.a0AfH6SMAGrmsw2V3BZjxbnOSTlSh0Uttb7lNAlVnkbj0lJUmMVpAksWVi2pp7FqwnRC61WHFdOB0cWM5iIEYYRkUvfbv3EXzeUbHFduZAUNnkdgmG3p7ctdY5aToYqqtz5TBMjdbg2O6gFDwwHHlvAaKv1KuU-unRbn0b5zV322g&token_type=Bearer&expires_in=3599&scope=email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&authuser=0&prompt=consent
*/
const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    SetCurrentUser(user: $user) @client
  }
`;
const InitWishList = gql`
  mutation InitWishList($list: [Product!]!) {
    InitWishList(list: $list) @client
  }
`;
const LOGIN_WITH_GOOGLE = gql`
  mutation LoginSNS($provider: SNSProvider!, $accessToken: String!) {
    loginSNS(provider: $provider, accessToken: $accessToken) {
      jwt
      userId
      user {
        _id
        name
        email
        phone
        address {
          _id
          isPrimary
          addressNo
        }
      }
    }
  }
`;

const GoogleCallback = (props) => {
  // console.log(props.location.hash);
  const [isLoggin, setLogin] = useState(false);
  const url = props.location.hash;
  const token = url
    .split('&')
    .find((item) => item.startsWith('access_token='))
    .replace('access_token=', '');
  const [login] = useMutation(LOGIN_WITH_GOOGLE);
  // const [setCurrentUser] = useMutation(SET_CURRENT_USER);
  // const [initWishList] = useMutation(InitWishList);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const currentUser = useReactiveVar(currentUserVar);
  const [getWishList] = useLazyQuery(GET_WISHLIST, {
    onCompleted: (data) => {
      initWishList(data.customerGetWishlist);
    },
  });
  // const [getWishList] = useLazyQuery(GET_WISHLIST, {
  //   onCompleted: (data) => {
  //     // console.log('get wishlist after login');
  //     // console.log(data.customerGetWishlist);
  //     initWishList({ variables: { list: data.customerGetWishlist } }).then(
  //       (res) => {
  //         console.log(res);
  //         console.log('running init ');
  //       }
  //     );
  //   },
  // });
  useEffect(() => {
    login({ variables: { provider: 'google', accessToken: token } })
      .then((res) => {
        // console.log("Login Success");
        const data = res.data.loginSNS;
        const user = {
          jwt: data.jwt,
          // info: data.user,
          ...data.user,
        };
        handleSetLoggedInState(user);
        registerTokenAndSubscribe(user);
        getWishList();
        setLogin(true);
        // const user = {
        //   jwt: data.jwt,
        //   info: data.user,
        // };
        // // localStorage.setItem('currentUserTesting', JSON.stringify(user));
        // setCurrentUser({ variables: { user } })
        //   .then(() => {
        //     // console.log('set currentuser successfully');
        //     registerTokenAndSubscribe(user.info);
        //     getWishList();
        //     setLogin(true);
        //   })
        //   .catch((e) => {
        //     // console.log('we have a problem with setcurrentLocal');
        //     // console.log(e)
        //   });
      })
      .catch((e) => {
        // console.log(e)
        // console.log('login fail')
      });
  }, []);
  if (isLoggin) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <p>Hi, i'm facebook callback</p>
    </div>
  );
};

export default GoogleCallback;
