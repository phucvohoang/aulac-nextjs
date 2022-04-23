import React from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import ProductsCategory from '../../components/ProductsCategory/ProductCategory.container.js';
import Article from '../../components/Article/Article.component';
// import { useTranslation } from 'react-i18next';
import useTranslation from 'next-translate/useTranslation';
const News = (props) => {
  // console.log(props.listNews)
  const { t } = useTranslation('common');
  return (
    <div className="news__container">
      <div className="news__header">
        <SectionHeader title={t('header.news')} />
      </div>
      <div className="news">
        <div className="news__category">
          <ProductsCategory />
          {/* <ProductsOnSale/> */}
        </div>
        <div className="news__content">
          {/* <ProductsList categoryID={categoryID} /> */}
          <Article listNews={props.listNews.docs} isNews={true} />
        </div>
      </div>
    </div>
  );
};

export default News;
