import React from 'react';
import Table from '../../components/Table/Table.container.jsx';
import useTranslation from 'next-translate/useTranslation';
const Order = (props) => {
  //   console.log(props.listRegions);
  const { t } = useTranslation('common');
  return (
    <section className="container">
      <h1>{t('cart')}</h1>
      <Table listRegions={props.listRegions} />
    </section>
  );
};

export default Order;
