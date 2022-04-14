import React from 'react';
import { Container, BannerLeft, BannerRight } from './styled';

const BannerVertical = (props) => {
  // const { Ads } = props;
  return (
    <Container>
      <BannerLeft>
        <img src="https://api.aulacshop.com/ads/c9b1f370-e515-481a-9a42-0cface51c2e6.jpg" />
      </BannerLeft>
      <BannerRight>
        <img src="https://api.aulacshop.com/ads/47419f4d-6c71-4bf2-8aff-c2c729c67060.jpg" />
      </BannerRight>
    </Container>
  );
};
export default BannerVertical;
