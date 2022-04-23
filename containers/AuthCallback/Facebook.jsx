import React, { useEffect, useState } from 'react';
import { useMutation, gql, useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_WISHLIST } from '../../graphql/queries';

import { handleSetLoggedInState, initWishList } from '../../graphql/utils';
import { isLoggedInVar, currentUserVar } from '../../graphql/cache';
import { registerTokenAndSubscribe } from '../../firebase/firebase.util';
/*"#access_token=EAASXX3ZCyJVEBAK5SgfimTG3bV3lzRAdMpJv1ZB9AJH8I2wf4ZBNqOQtmQvtExFmWYrK3EiJq3vH3XM4wxZAd2JaeyGX0RcLi6DXGj81ES2qDhMMMGuuL3ZBQaAxkW1ZCIB16EjE0Wfxz6YZAOyMZCTDCy8yrvvzZC2wH7rMviEo0NskwNcIkQrOvqyXemLlMJbqdUPm2MfTluyXQtfasZCEqX&data_access_expiration_time=1614762500&expires_in=6700&state=facebook"
 */
// fb: phuc_yoqoeyl_vo@tfbnw.net
// pass: Abc12345
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
const LOGIN_WITH_FACEBOOK = gql`
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

const FbCallback = (props) => {
  // console.log(props.location.hash);
  const [isLoggin, setLogin] = useState(false);
  const url = props.location.hash;
  const token = url
    .split('&')
    .find((item) => item.startsWith('#access_token='))
    .replace('#access_token=', '');
  const [login] = useMutation(LOGIN_WITH_FACEBOOK);
  // const [setCurrentUser] = useMutation(SET_CURRENT_USER);
  // const [initWishList] = useMutation(InitWishList);
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
  const [getWishList] = useLazyQuery(GET_WISHLIST, {
    onCompleted: (data) => {
      initWishList(data.customerGetWishlist);
    },
  });
  useEffect(() => {
    login({ variables: { provider: 'facebook', accessToken: token } })
      .then((res) => {
        const data = res.data.loginSNS;
        console.log(data);
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
        //     console.log();
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
      <p>Loading....</p>
    </div>
  );
};

export default FbCallback;
