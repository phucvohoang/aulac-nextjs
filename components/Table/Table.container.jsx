import React, { useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { CUSTOMER_CHECK_IN_STOCK } from '../../lib/graphql/queries';
import Table from './Table.jsx';
import { convertCartToRequestBody } from '../../util/helper';
import {
  updateCartItem,
  removeCartItem,
  handleSetRegion,
} from '../../lib/graphql/resolvers/utils';
import {
  regionVar,
  cartItemsVar,
  currentUserVar,
  isLoggedInVar,
} from '../../lib/graphql/cache';

const TableContainer = (props) => {
  const cartItems = useReactiveVar(cartItemsVar);
  const region = useReactiveVar(regionVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const currentUser = useReactiveVar(currentUserVar);
  const [listItemInStock, setListItemInStock] = useState({});
  const [checkInStock] = useLazyQuery(CUSTOMER_CHECK_IN_STOCK, {
    onCompleted: (data) => {
      // console.log('==== Item In Stock =======');
      // console.log(data.customerCheckInStock);
      // console.log('==== Body push =======');
      // console.log(convertCartToRequestBody(cartItems));
      const { customerCheckInStock } = data;
      const normalizeData = {};
      customerCheckInStock.forEach((item) => {
        normalizeData[item.product] = item.inStock;
      });
      setListItemInStock(normalizeData);
    },
    onError: (e) => {
      console.log(e);
      console.log('We found error when checking stock');
    },
    fetchPolicy: 'network-only',
  });
  const recheckInStock = (newData, newRegion = null) => {
    const details = convertCartToRequestBody(newData);
    // console.log('==== Body push before sending=======');

    const branchId = newRegion
      ? newRegion?.selectedBrand?._id
      : region?.selectedBrand?._id;
    // console.log({ details, branch: branchId });
    if (branchId) {
      checkInStock({
        variables: {
          details,
          branch: branchId,
        },
      });
    }
  };
  // const [setRegion] = useMutation(CHOOSE_REGION);
  const handleRemove = (item) => {
    // console.log('clicked remove')
    const newData = removeCartItem(item);
    recheckInStock(newData);
  };
  const handleUpdate = (item) => {
    // console.log(item)
    const newData = updateCartItem(item);
    // const branchId = region?.selectedBrand?._id;
    recheckInStock(newData);
  };
  // console.log(cartItems)
  const handleChooseRegion = (region) => {
    // console.log(region);
    const newRegion = handleSetRegion(region);
    // const cartItems = cartItemsVar();
    recheckInStock(cartItems, newRegion);
  };
  // console.log(props.currentUser.currentUser);
  return (
    <Table
      {...props}
      region={region}
      checkInStock={checkInStock}
      cartItems={cartItems}
      update={handleUpdate}
      remove={handleRemove}
      chooseRegion={handleChooseRegion}
      listItemInStock={listItemInStock}
      isLoggedIn={isLoggedIn}
      currentUser={currentUser}
      recheckInStock={recheckInStock}
    />
  );
};
export default TableContainer;
// export default flowRight(
//   graphql(GET_REGION, { name: 'regionLocal' }),
//   graphql(GET_CURRENT_USER, { name: 'currentUser' })
// )(TableContainer);
