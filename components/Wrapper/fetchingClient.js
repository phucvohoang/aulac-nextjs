import React, { useState, useEffect} from 'react';

export const ClientSide = (Component) => (props) => {
  return typeof window === 'undefined' ? null : <Component {...props} />
}

const ClientOnly = ({ children, ...delegated}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default ClientOnly