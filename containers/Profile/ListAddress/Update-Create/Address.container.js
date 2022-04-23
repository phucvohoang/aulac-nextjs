import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_LIST_CITIES,
  GET_LIST_WARDS,
  LIST_DISTRICTS,
  CUSTOMER_UPDATE_ADDRESS_V2,
  CUSTOMER_GET_PROFILE,
} from '../../../../lib/graphql/queries';
import Address from './Address';

const AddressContainer = (props) => {
  const [cities, setCities] = useState([]);
  const [districtList, setDistricts] = useState([]);
  const [wardList, setWards] = useState([]);
  const [update] = useMutation(CUSTOMER_UPDATE_ADDRESS_V2, {
    refetchQueries: [
      {
        query: CUSTOMER_GET_PROFILE,
      },
    ],
  });
  const [getCities] = useLazyQuery(GET_LIST_CITIES, {
    onCompleted: (data) => {
      setCities(data.listCities);
    },
  });
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

  return (
    <Address
      {...props}
      updateAddress={update}
      districtList={districtList}
      wardList={wardList}
      cities={cities}
      getCitiesLazy={getCities}
      getDistrictsLazy={getDistricts}
      getWardsLazy={getWards}
    />
  );
};

export default AddressContainer;
