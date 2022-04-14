import React from 'react';
import { Carousel } from 'antd';
import { Box } from '../styled';
import { BoxItem } from './styled';
const BannerHorizontal = (props) => {
  const { adsHomeCenter = [] } = props.Ads;
  const onChange = (a, b, c) => {
    // console.log(a, b, c);
  };
  const renderAds = adsHomeCenter.map((item, idx) => {
    const { imageUrl = '' } = item;
    return (
      <BoxItem key={idx}>
        <img src={imageUrl} style={{ objectFit: 'contain' }} alt="aulac-food" />
      </BoxItem>
    );
  });
  return (
    <Box>
      <Carousel autoplay afterChange={onChange}>
        {renderAds}
      </Carousel>
    </Box>
  );
};
export default BannerHorizontal;
