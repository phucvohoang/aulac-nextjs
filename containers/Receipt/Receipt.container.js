import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Receipt from './Receipt.component';
import { scrollToTop } from '../../util/helper';
import { LIST_FOOD_RECEIPT } from '../../lib/graphql/queries'

const ReceiptContainer = () => {
  const [listFoodReceipt, setListReceipt] = useState({});
  const [getData] = useLazyQuery(LIST_FOOD_RECEIPT, {
    onCompleted: (response) => {
      const { listFoodReceipt } = response;
      setListReceipt(listFoodReceipt);
      scrollToTop();
    },
    fetchPolicy: 'no-cache'
  });
  return <Receipt listNews={listFoodReceipt} getData={getData} />;
};
export default ReceiptContainer;
