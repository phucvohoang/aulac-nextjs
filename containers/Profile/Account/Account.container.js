import React from 'react';
import { useQuery } from '@apollo/client';
import { CUSTOMER_GET_PROFILE } from '../../../lib/graphql/queries';
import Account from './Account';

const AccountProfile = () => {
  const { data, loading, error } = useQuery(CUSTOMER_GET_PROFILE);

  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>Error..</p>;
  }
  const { customerGetProfile } = data;
  // console.log(customerGetProfile)
  return <Account profile={customerGetProfile} />;
};

export default AccountProfile;
