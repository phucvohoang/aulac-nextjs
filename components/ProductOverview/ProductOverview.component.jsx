import React, { useState } from 'react';
import Product from '../Product/Product.container.jsx';
// import { useTranslation } from "react-i18next";
import useTranslation from 'next-translate/useTranslation';

import { mapTabSection } from '../../util/helper.js';
import { Box } from '../Banner/styled.js';
import { BoxItem } from '../Banner/horizontal/styled.js';

const ProductOverview = (props) => {
  const [currentTab, setTab] = useState(0);

  const { t } = useTranslation('common');
  console.log(t);
  const { sections } = props;

  return sections.map((section, idx) => {
    const { bannerDesk, title, products } = section;
    const renderBanner = () => {
      if (!bannerDesk) return <div />;
      return (
        <Box>
          <BoxItem>
            <img
              src={bannerDesk}
              style={{ objectFit: 'contain' }}
              alt="aulac-food"
            />
          </BoxItem>
        </Box>
      );
    };
    const renderProducts = () => {
      return products.map((product) => (
        <Product {...props} product={product} key={product._id} />
      ));
    };
    return (
      <React.Fragment key={idx}>
        {renderBanner()}
        <section className="product__overview">
          <div className="product__overview__header">
            <h1>{t(mapTabSection(title))}</h1>
          </div>
          <div className="products__list">{renderProducts()}</div>
        </section>
      </React.Fragment>
    );
  });
};

export default ProductOverview;
