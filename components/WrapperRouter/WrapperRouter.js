import React from 'react';
import { useRouter } from 'next/router';

const WrapperRouter = (Component) => (props) => {
  // const { t, lang } = useTranslation('common');
  const router = useRouter()
  return <Component {...props} router={router} />;
};

export default WrapperRouter;
