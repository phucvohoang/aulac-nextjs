import React from 'react';
import { useRouter } from 'next/router';

const HOCRouter = (WC) => {
  const MyComp = (props) => {
    const router = useRouter();
    return <WC {...props} router={router} />;
  };
  MyComp.displayName = 'HOCRouter';
  return MyComp;
};
// const WrapperRouter = (Component) => (props) => {
//   // const { t, lang } = useTranslation('common');
//   const router = useRouter()
//   return <Component {...props} router={router} />;
// };

export default HOCRouter;
