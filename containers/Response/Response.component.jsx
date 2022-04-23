import React from 'react';
import Contact from '../../components/Contact/contact.container';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import useTranslation from 'next-translate/useTranslation';
const Response = (props) => {
  const { t } = useTranslation('common');
  return (
    <div className="products__container">
      <div className="products__header">
        <SectionHeader title={t('header.stores')} />
      </div>
      <div className="news">
        <Contact />
      </div>
    </div>
  );
};

export default Response;
