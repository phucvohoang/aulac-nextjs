import React from 'react';
import ResetPwComp from './ResetPassword.component';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../../graphql/queries';

const ResetPwContainer = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const accessToken = params.accessToken;
  const [resetPw] = useMutation(RESET_PASSWORD);
  return <ResetPwComp resetPw={resetPw} accessToken={accessToken} />;
};

export default ResetPwContainer;
