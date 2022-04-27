import React from 'react';
import { useQuery } from '@apollo/client';
import BannerHorizontal from './horizontal';
import BannerLeft from './vertical/left';
import BannerRight from './vertical/right';
import { GET_ADS_DESKTOP } from '../../lib/graphql/queries';

const BannerContainer = (props) => {
  const { isCenter, isLeft, isRight } = props;
  const { data, loading, error } = useQuery(GET_ADS_DESKTOP, { fetchPolicy: 'network-only'});
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log('im in error getAdsDesktop')
    console.log(error);
    return <p>Error...</p>;
  }
  const { getAdsDesktop } = data;
  if (isCenter) {
    return <BannerHorizontal Ads={getAdsDesktop} />;
  } else if (isLeft) {
    return <BannerLeft Ads={getAdsDesktop} />;
  } else if (isRight) {
    return <BannerRight Ads={getAdsDesktop} />;
  }
};
export default BannerContainer;
