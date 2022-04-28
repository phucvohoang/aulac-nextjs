import React from 'react';
import { BannerRight } from './styled';

const BannerRightComp = (props) => {
  const { Ads } = props;
  const img =
    Ads?.adsHomeRight?.imageUrl ??
    'https://api.aulacshop.com/ads/c9b1f370-e515-481a-9a42-0cface51c2e6.jpg';
  return (
    <BannerRight>
      <img src={img} alt="aulac banner" />
    </BannerRight>
  );
};
export default BannerRightComp;
