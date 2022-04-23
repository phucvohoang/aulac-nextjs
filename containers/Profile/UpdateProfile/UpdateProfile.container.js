import React from 'react';
import UpdateProfile from './UpdateProfile.component';
import { useMutation } from '@apollo/client';
import {
  customerUpdateProfile,
  handleSetLogOutState,
} from '../../../lib/graphql/resolvers/utils';
import {
  CUSTOMER_UPDATE_PROFILE,
  CUSTOMER_GET_PROFILE,
  CUSTOMER_UPLOAD_AVATAR,
  CUSTOMER_UPDATE_PASSWORD,
} from '../../../lib/graphql/queries';
import { notification } from 'antd';
// import { notification } from 'antd';
const UpdateProfileContainer = (props) => {
  const [updateProfile, { loading: updatingProfile }] = useMutation(
    CUSTOMER_UPDATE_PROFILE,
    {
      onCompleted: (data) => {
        //console.log(data);
        const { name, phone } = data.customerUpdateProfile;
        customerUpdateProfile({ name, phone });
        notification.success({
          message: 'Cập Nhật Thành Công',
        });
      },
      onError: (e) => {
        // //console.log(e);
        notification.error({
          message: 'Cập Nhật Thất Bại',
        });
      },
      refetchQueries: [
        {
          query: CUSTOMER_GET_PROFILE,
        },
      ],
    }
  );
  const [updateAvatar, { loading: updatingAvatar }] = useMutation(
    CUSTOMER_UPLOAD_AVATAR,
    {
      onCompleted: (data) => {
        //console.log(data);
        const { avatar } = data.customerUploadAvatar;
        customerUpdateProfile({ avatar });
        notification.success({
          message: 'Cập Nhật Thành Công',
        });
      },
      onError: (e) => {
        // //console.log(e);
        notification.error({
          message: 'Cập Nhật Thất Bại',
        });
      },
      refetchQueries: [
        {
          query: CUSTOMER_GET_PROFILE,
        },
      ],
    }
  );
  const [updatePassword, { loading: updatingPassword }] = useMutation(
    CUSTOMER_UPDATE_PASSWORD,
    {
      onCompleted: (data) => {
        //   //console.log(data);
        handleSetLogOutState();
        notification.success({
          message: 'Cập Nhật Thành Công',
        });
      },
      onError: (e) => {
        // //console.log(e);
        notification.error({
          message: 'Cập Nhật Thất Bại',
        });
      },
      refetchQueries: [
        {
          query: CUSTOMER_GET_PROFILE,
        },
      ],
    }
  );

  return (
    <UpdateProfile
      user={props.user}
      updatingProfile={updatingProfile}
      updatingAvatar={updatingAvatar}
      updatingPassword={updatingPassword}
      updateAvatar={updateAvatar}
      updateProfile={updateProfile}
      updatePassword={updatePassword}
    />
  );
};

export default UpdateProfileContainer;
