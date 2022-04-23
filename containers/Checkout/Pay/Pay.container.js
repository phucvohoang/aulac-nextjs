import React, { useState } from 'react';
import { useReactiveVar, useLazyQuery, useQuery } from '@apollo/client';
import Pay from './Pay';
import { getItem, setItem } from '../../../util/localStorage';
import { notification } from 'antd';
import { regionVar, isLoggedInVar } from '../../../lib/graphql/cache';
import {
  CUSTOMER_LIST_COUPON,
  CUSTOMER_PRECALCULATE_DISCOUNT,
} from '../../../lib/graphql/queries';
import { useRouter } from 'next/router';
// import { Redirect } from 'react-router-dom';
const PayContainer = (props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(CUSTOMER_LIST_COUPON);
  const region = useReactiveVar(regionVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [coupon, setCoupon] = useState({
    discountCode: '',
    discountType: '',
    discountValue: '',
    status: false,
    completeMsg: '',
  });
  const [preCalculatePromo] = useLazyQuery(CUSTOMER_PRECALCULATE_DISCOUNT, {
    onCompleted: (data) => {
      const { customerPreCalculateOrderSummary } = data;
      const { discountType, discountValue } = customerPreCalculateOrderSummary;
      const discountCode = getItem('discountCode');
      const completeMsg = `Bạn đã được giảm ${discountValue}${
        discountType === 'fixed' ? 'đ' : '%'
      } từ mã ${discountCode}`;

      setCoupon({
        ...coupon,
        completeMsg,
        discountCode,
        status: 'success',
      });
    },
    onError: (e) => {
      notification.error({
        message: 'Error',
      });
      setCoupon({
        ...coupon,
        completeMsg: 'Mã giảm giá không hợp lệ',
        discountCode: '',
        status: 'error',
      });
    },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }
  const handleCheckCoupon = (payload, cb) => {
    //console.log('============ In handle check Coupon =============');
    //console.log(payload);
    setItem('discountCode', payload.discountCode);
    // setCbCoupon(cb);
    preCalculatePromo({
      variables: {
        preCalculateOrderSummaryRequest: payload,
      },
    });
  };
  const { customerListMyCoupon } = data;
  if (!isLoggedIn) {
    return router.push('/');
  }
  return (
    <Pay
      {...props}
      region={region}
      listCoupon={customerListMyCoupon}
      preCalculatePromo={handleCheckCoupon}
      coupon={coupon}
    />
  );
};
export default PayContainer;
// export default flowRight(graphql(GET_REGION, { name: 'regionLocal' }))(
//   PayContainer
// );
// export default PayContainer;
