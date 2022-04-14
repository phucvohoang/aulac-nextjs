import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Contact from './ContactForm.component';
import { LIST_SALE_REGIONS } from '../../lib/graphql/queries';
// const LIST_SALE_REGIONS = gql`
//   query ListSaleRegions {
//     listSaleRegions {
//       _id
//       name
//       branches {
//         _id
//         name
//       }
//     }
//   }
// `;

const ContactContainer = (props) => {
  const { data, loading, error } = useQuery(LIST_SALE_REGIONS);
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>We have an error</p>;
  }
  const { listSaleRegions } = data;
  return <Contact regions={listSaleRegions} />;
};
export default ContactContainer;
