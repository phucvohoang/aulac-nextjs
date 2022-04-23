import React from 'react';
import { useMutation } from '@apollo/client';
import ListAddress from './ListAddress.component';
import {
  CUSTOMER_GET_PROFILE,
  CUSTOMER_REMOVE_ADDRESS,
} from '../../../lib/graphql/queries';

const ListAddressContainer = (props) => {
  const [remove] = useMutation(CUSTOMER_REMOVE_ADDRESS, {
    onCompleted: (data) => {
      // console.log('remove success');
      // console.log(data)
    },
    onError: (e) => {
      // console.log('remove fail');
      // console.log(e)
    },
    refetchQueries: [
      {
        query: CUSTOMER_GET_PROFILE,
      },
    ],
  });

  return <ListAddress {...props} remove={remove} />;
};

export default ListAddressContainer;
