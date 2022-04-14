import React from 'react';
import { BannerLeft } from './styled';

const BannerLeftComp = (props) => {
  const { Ads } = props;
  const img =
    Ads?.adsHomeLeft?.imageUrl ??
    'https://api.aulacshop.com/ads/c9b1f370-e515-481a-9a42-0cface51c2e6.jpg';
  return (
    <BannerLeft>
      <img src={img} />
    </BannerLeft>
  );
};
export default BannerLeftComp;
