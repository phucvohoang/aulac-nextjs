import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { LIST_SALE_REGIONS } from '../../lib/graphql/queries';
import { regionVar } from '../../lib/graphql/cache';
import { handleSetRegion } from '../../lib/graphql/resolvers/utils';
import Modal from './Modal.component.jsx';

const ModalContainer = () => {
  const { data, loading, error } = useQuery(LIST_SALE_REGIONS);
  const region = useReactiveVar(regionVar);
  if (loading) {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>We have an error...</p>;
  }

  const handleChooseRegion = (region) => {
    // // console.log(region);
    handleSetRegion(region);
  };
  const { listSaleRegions } = data;
  return (
    <Modal
      isChoosen={region}
      regions={listSaleRegions}
      chooseRegion={handleChooseRegion}
    />
  );
};

export default ModalContainer;
