import React from 'react';
import ForgetPwComp from './ForgetPW.component';
import { useLazyQuery } from '@apollo/client';
import { REQUEST_RESET_PASSWORD } from '../../lib/graphql/queries';

const FogetPwContainer = () => {
  const [requestReset] = useLazyQuery(REQUEST_RESET_PASSWORD, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return <ForgetPwComp forgetPW={requestReset} />;
};

export default FogetPwContainer;
