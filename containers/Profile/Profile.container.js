import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar, currentUserVar } from '../../lib/graphql/cache';
import { CUSTOMER_GET_PROFILE } from '../../lib/graphql/queries';
import Profile from './Profile.component';
import { useRouter } from 'next/router';
// import { Redirect } from 'react-router-dom';

const ProfileContainer = (props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(CUSTOMER_GET_PROFILE, {
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>We have an error</p>;
  }

  const { customerGetProfile: user } = data;
  // console.log(user)
  return <Profile {...props} isLoggedIn={props.isLoggedIn} user={user} />;
};

const WrapperLogin = (props) => {
  // const { currentUser } = props.user;
  const currentUser = useReactiveVar(currentUserVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (!isLoggedIn) {
    // return <Redirect to="/" />;
    return router.push('/');
  }
  return (
    <ProfileContainer
      {...props}
      currentUser={currentUser}
      isLoggedIn={isLoggedIn}
    />
  );
};
export default WrapperLogin;
// export default flowRight(graphql(GET_CURRENT_USER, { name: 'user' }))(
//   WrapperLogin
// );
