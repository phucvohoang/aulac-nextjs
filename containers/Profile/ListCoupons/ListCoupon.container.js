import React from 'react';
import { useQuery } from '@apollo/client';
import ListCoupon from './ListCoupon.component';
import { CUSTOMER_LIST_COUPON } from '../../../lib/graphql/queries';

const ListCouponContainer = (props) => {
  const { data, loading, error } = useQuery(CUSTOMER_LIST_COUPON, {
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }

  const { customerListMyCoupon } = data;
  console.log('List coupon current');
  console.log(customerListMyCoupon);

  return <ListCoupon listCoupon={customerListMyCoupon} />;
};

export default ListCouponContainer;
