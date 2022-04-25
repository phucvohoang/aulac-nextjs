import React, { useState } from 'react';
import Summary from './Summary';
import {
  gql,
  useQuery,
  useLazyQuery,
  useMutation,
  useReactiveVar,
} from '@apollo/client';
import {
  CUSTOMER_PRECALCULATE_DISCOUNT,
  CHECK_OUT,
  CUSTOMER_CALCULATE_SHIPPING_FEE,
} from '../../../lib/graphql/queries';
import { getItem } from '../../../util/localStorage';
import { isLoggedInVar, currentUserVar } from '../../../lib/graphql/cache';
import { useRouter } from 'next/router';
// import { Redirect } from 'react-router-dom';
const CLEAR_CART = gql`
  mutation CleaCart {
    ClearItemFromCart @client
  }
`;
const SummaryContainer = (props) => {
  const router = useRouter();
  const [clearData] = useMutation(CLEAR_CART);
  const order = props.checkoutData;
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const currentUser = useReactiveVar(currentUserVar);
  //console.log(order);
  const [shippingFeeResponse, setShippingFeeResponse] = useState({
    shippingFee: null,
    branch: null,
  });
  const [calculateShippingFee] = useLazyQuery(CUSTOMER_CALCULATE_SHIPPING_FEE, {
    onCompleted: (data) => {
      const { customerCalculateShippingFee } = data;
      console.log('======= Data ======');
      console.log(customerCalculateShippingFee);
      setShippingFeeResponse({
        shippingFee: customerCalculateShippingFee.shippingFee,
      });
    },
    onError: (e) => {
      console.log('=========== Fail when calling Shipping Fee ===========');
      console.log(e);
    },
    nextFetchPolicy: 'network-only',
  });
  const [checkout] = useMutation(CHECK_OUT);
  //console.log(order);
  const { details, discountCode, isRequiredVatInvoice, saleRegion } =
    order ?? {};
  // getItem
  const { data, loading, error } = useQuery(CUSTOMER_PRECALCULATE_DISCOUNT, {
    variables: {
      preCalculateOrderSummaryRequest: {
        details,
        discountCode,
        isRequiredVatInvoice,
        saleRegion,
      },
    },
  });

  if (loading) {
    return <p>loading....</p>;
  }
  if (error) {
    console.log(error);
    return <p>Đơn hàng đang trống...</p>;
  }
  if (!isLoggedIn) {
    router.replace('/');
    // return router.push('/');
  }

  const { totalAmountFinal } = data.customerPreCalculateOrderSummary;
  return (
    <Summary
      cartItems={props.cartItems}
      {...props}
      totalAmountFinal={totalAmountFinal}
      checkout={checkout}
      shippingFeeResponse={shippingFeeResponse}
      calculateShippingFee={calculateShippingFee}
      clearDataCartItems={clearData}
    />
  );
};

export default SummaryContainer;
