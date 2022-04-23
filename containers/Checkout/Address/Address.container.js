import React, { useState } from 'react';
import {
  useLazyQuery,
  useMutation,
  gql,
  useQuery,
  useReactiveVar,
} from '@apollo/client';
import Address from './Address';
import {
  LIST_DISTRICTS,
  GET_LIST_WARDS,
  GET_LIST_CITIES,
  CUSTOMER_ADD_ADDRESS,
  CUSTOMER_ADD_ADDRESS_V2,
} from '../../../lib/graphql/queries';
import {
  isLoggedInVar,
  currentUserVar,
  regionVar,
} from '../../../lib/graphql/cache';
import { addNewAddressToUser } from '../../../lib/graphql/resolvers/utils';
import { Redirect } from 'react-router-dom';
const UpdateUserAddress = gql`
  mutation UpdateUserAddress($address: AddressInput!) {
    UpdateUserAddress(address: $address) @client
  }
`;
const AddressContainer = (props) => {
  const [districtList, setDistricts] = useState([]);
  const { data, loading, error } = useQuery(GET_LIST_CITIES);
  const [addAddress] = useMutation(CUSTOMER_ADD_ADDRESS_V2);
  // const [addAddressLocal] = useMutation(UpdateUserAddress);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const region = useReactiveVar(regionVar);
  // const [cities, setCities] = useState([]);
  const [wardList, setWards] = useState([]);
  // const [getCities] = useLazyQuery(GET_LIST_CITIES, {
  //   onCompleted: (data) => {
  //     setCities(data.listCities);
  //   },
  // });
  const [getDistricts] = useLazyQuery(LIST_DISTRICTS, {
    onCompleted: (data) => {
      setDistricts(data.listDistricts);
    },
  });
  const [getWards] = useLazyQuery(GET_LIST_WARDS, {
    onCompleted: (data) => {
      setWards(data.listWards);
    },
  });
  const addAddressLocal = (address) => {
    addNewAddressToUser(address);
  };

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error when fetching city</p>;
  }
  const cities = data.listCities;
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Address
      districtList={districtList}
      wardList={wardList}
      cities={cities}
      region={region}
      addAddress={addAddress}
      addAddressLocal={addAddressLocal}
      // cartItems={cartItems}
      getDistrictsLazy={getDistricts}
      getWardsLazy={getWards}
      // getCities={getCities}
      currentUser={props.currentUser}
      isLoggedIn={props.isLoggedIn}
      backToLastStep={props.backToLastStep}
      {...props}
    />
  );
};

export default AddressContainer;
