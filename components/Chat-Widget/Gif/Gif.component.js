import React, { useState } from 'react';
import { Gif } from '@giphy/react-components';
import { useAsync } from 'react-async-hook';
import { GiphyFetch } from '@giphy/js-fetch-api';
const giphyFetch = new GiphyFetch('riUzkgxEwoen5AUSDxpjVUkhfeHGVOAb');

const GifComponent = ({ id }) => {
  const [gif, setGif] = useState(null);
  useAsync(async () => {
    const { data } = await giphyFetch.gif(id);
    setGif(data);
  }, []);
  return gif && <Gif gif={gif} width={200} />;
};

export default GifComponent;
