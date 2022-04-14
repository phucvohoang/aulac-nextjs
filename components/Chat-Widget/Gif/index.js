import React, { useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

import ResizeObserver from 'react-resize-observer';
import { GifContainer } from './styled';
import { Row } from 'antd';

const giphyFetch = new GiphyFetch('riUzkgxEwoen5AUSDxpjVUkhfeHGVOAb');

const GridGif = (props) => {
  const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
  const [width, setWidth] = useState(window.innerWidth);

  const onGifClick = (gif, e) => {
    e.preventDefault();
    //console.log(gif);
    const { type, images } = gif;
    const { url } = images.downsized_medium;
    //console.log(url);
    props.handleSendImage(url, type);
  };
  return (
    <GifContainer>
      <Row gutter={[16, 16]} className="gif__container">
        <Grid
          onGifClick={onGifClick}
          fetchGifs={fetchGifs}
          width={width}
          columns={3}
          gutter={6}
        />
        <ResizeObserver
          onResize={({ width }) => {
            setWidth(width);
          }}
        />
      </Row>
    </GifContainer>
  );
};

export default GridGif;
