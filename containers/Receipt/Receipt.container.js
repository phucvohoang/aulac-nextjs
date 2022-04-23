import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Receipt from './Receipt.component';
import { scrollToTop } from '../../util/helper';
const LIST_FOOD_RECEIPT = gql`
  query listFoodReceipt($page: Int, $perPage: Int) {
    listFoodReceipt(page: $page, perPage: $perPage) {
      docs {
        _id
        title
        slug
        content
        contentHTML
        cover
      }
      totalDocs
      totalPages
    }
  }
`;

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
  // if(loading){
  //     return <p>Loading...</p>
  // }
  // if(error){
  //     return <p>Error</p>
  // }

  //   const { listFoodReceipt } = data;

  return <Receipt listNews={listFoodReceipt} getData={getData} />;
};
export default ReceiptContainer;
