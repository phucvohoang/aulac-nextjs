import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { registerToken } from '../../firebase/firebase.util';
const GET_HOME_BACKGROUND = gql`
  query GetHomeBackground {
    getHomeBackground {
      url
    }
  }
`;

// export const ClientSide = (Component) => (props) => {
//   return typeof window === 'undefined' ? null : <Component {...props} />;
// };

const ClientOnly = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};
export const SetupClient = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const { data, loading, error } = useQuery(GET_HOME_BACKGROUND);
  useEffect(() => {
    setHasMounted(true);
    registerToken();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error);
    return <p>Could not load data</p>;
  }
  const {
    url = 'https://aulac-media.s3.ap-southeast-1.amazonaws.com/images/pageSettings/home-background-1608388214906.png',
  } = data?.getHomeBackground ?? {};

  console.log(`Background Url: ${url}`);
  const body = document.querySelector('body');
  body.style.backgroundImage = `url("${url}")`;
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
