import styled from 'styled-components';

export const GifContainer = styled.div`
  padding: 10px;
  position: absolute;
  height: 300px;
  width: 200px;

  left: 0;
  bottom: 100%;
  border-radius: 5px;
  background-color: #fff;
  /* opacity: 0;
  visibility: hidden; */
  transition: all 0.2s;
  img {
    width: 100%;
  }

  .gif__container {
    // max-height: 220px;
    height: 100%;
    overflow: auto;
  }
`;
export const StickerList = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CarouselArrow = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CarouselStickers = styled.div`
  width: calc(100% - 40px);
`;
