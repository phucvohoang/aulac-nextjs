import styled from 'styled-components';

export const BannerLeft = styled.div`
  position: fixed;
  top: 10%;
  left: 40px;
  width: 100px;
  height: 700px;
  box-shadow: 0rem 1rem 4rem rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-5px) scale(1.01);
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
