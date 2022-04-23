import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { LIST_SALE_REGIONS } from '../../lib/graphql/queries';
import { regionVar } from '../../lib/graphql/cache';
import { handleSetRegion } from '../../lib/graphql/resolvers/utils';
import Modal from './Modal.component.jsx';

import { initializeApollo } from '../../lib/apollo';

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
  console.log('im listSaleRegions')
  console.log(listSaleRegions)
  return (
    <Modal
      isChoosen={region}
      regions={listSaleRegions}
      chooseRegion={handleChooseRegion}
    />
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  let listCategories = [];
  let regions = []
  try {
    await apolloClient.query({
      query: LIST_CATEGORIES,
    });
    await apolloClient.query({
      query: LIST_SALE_REGIONS
    })
    const { listCategories: data } = apolloClient.cache.readQuery({
      query: LIST_CATEGORIES,
    });
    const { listSaleRegions: regionsData } = apolloClient.cache.readQuery({
      query: LIST_SALE_REGIONS
    })
    console.log('im region data')
    regions = regionsData
    console.log(regions)
    listCategories = data;
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      categories: listCategories,
      regions: regions
    },
  };
}

export default ModalContainer;
