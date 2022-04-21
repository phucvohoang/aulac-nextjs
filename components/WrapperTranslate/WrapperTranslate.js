import React from 'react';
import useTranslation from 'next-translate/useTranslation';

const WrapperTranslate = (Component) => (props) => {
  const { t, lang } = useTranslation('common');
  return <Component {...props} t={t} language={lang} />;
};

export default WrapperTranslate;
