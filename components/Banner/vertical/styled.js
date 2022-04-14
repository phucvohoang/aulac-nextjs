import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export const BannerLeft = styled.div`
  position: absolute;
  top: 10%;
  left: 40px;
  width: 100px;
  height: 700px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
export const BannerRight = styled.div`
  position: absolute;
  top: 10%;
  right: 40px;
  width: 100px;
  height: 700px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
