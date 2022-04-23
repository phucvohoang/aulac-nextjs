import React, { useEffect } from 'react';
import Product from '../../../components/Product/Product.container';
import useTranslation from 'next-translate/useTranslation';
const WishList = (props) => {
  const { t } = useTranslation('common');
  const renderProductList = () => {
    const { products } = props;
    //console.log('================ Render Product List ==================');
    //console.log(products);
    return products.map((p, idx) => {
      return <Product key={idx} product={p} />;
    });
  };
  const renderProductsBody = () => {
    const { products } = props;
    if (products?.length > 0) {
      return (
        <div
          className="products__body__grid"
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {renderProductList()}
        </div>
      );
    } else {
      return <p style={{ padding: '2rem' }}>{t('profilepage.empty')}</p>;
    }
  };
  return (
    <React.Fragment>
      <p style={{ padding: '2rem' }}>{t('profilepage.favourite')}</p>
      {renderProductsBody()}
    </React.Fragment>
  );
};

export default WishList;
