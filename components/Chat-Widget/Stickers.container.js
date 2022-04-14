import React from 'react';
import { GET_STICKERS } from '../../lib/graphql/queries';
import { useQuery } from '@apollo/client';
import Sticker from './Stickers';

const StickerContainer = (props) => {
  const { data, loading, error } = useQuery(GET_STICKERS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }

  // console.log(data.listStickers)
  return <Sticker {...props} stickers={data.listStickers} />;
};

export default StickerContainer;
