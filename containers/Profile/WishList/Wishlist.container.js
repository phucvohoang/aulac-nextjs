import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_WISHLIST } from '../../../lib/graphql/queries';
import WishList from './Wishlist.component';

// const GET_WISHLIST = gql`
//   query CustomerGetWishlist {
//     customerGetWishlist {
//       _id
//       name
//       description
//       sku
//       salePrice
//       images
//       buyPriceExcTax
//       buyPriceIncTax
//       salePriceAfterDiscounted
//       appliedVAT
//       discountType
//       discountValue
//       isFavorite
//       category {
//         _id
//         name
//       }
//     }
//   }
// `;
const WishListContainer = () => {
  const { data, loading, error } = useQuery(GET_WISHLIST, {
    fetchPolicy: 'network-only',
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>We have an error...</p>;
  }
  const products = data ? data.customerGetWishlist : [];
  return <WishList products={products} />;
};

export default WishListContainer;
