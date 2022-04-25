import React from 'react';
import useTranslation from 'next-translate/useTranslation';

// const WrapperTranslate = (Component) => (props) => {
//   const { t, lang } = useTranslation('common');
//   return <Component {...props} t={t} language={lang} />;
// };

const WrapperTranslate = (WC) => {
  const MyComp = (props) => {
    const { t, lang } = useTranslation('common');
    return <WC {...props} t={t} language={lang} />;
  };
  MyComp.displayName = 'HOCTranslate';
  return MyComp;
};

export default WrapperTranslate;
