import React, { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import ProductsCategory from '../../components/ProductsCategory/ProductCategory.container.js';
import Article from '../../components/Article/Article.component';
// import { useTranslation } from 'react-i18next';
import useTranslation from 'next-translate/useTranslation';
const News = (props) => {
  // console.log(props.listNews)
  const { listNews } = props;
  useEffect(() => {
    props.getData({
      variables: {
        page: 1,
        perPage: 10,
      },
    });
  }, []);
  // getMoreBlog = (page) => {
  //   props.getData({
  //     variables: {
  //       page,
  //       perPage: 10,
  //     },
  //   });
  // };
  const { t } = useTranslation('common');
  return (
    <div className="news__container">
      <div className="news__header">
        <SectionHeader title={t('header.recipe')} />
      </div>
      <div className="news">
        <div className="news__category">
          <ProductsCategory />
          {/* <ProductsOnSale/> */}
        </div>
        <div className="news__content">
          {/* <ProductsList categoryID={categoryID} /> */}
          <Article
            // listNews={props?.listNews ? props?.listNews?.docs : []}
            listNews={listNews?.docs ?? []}
            getMoreBlog={props.getData}
            totalDocs={listNews?.totalDocs ?? 0}
            isNews={false}
          />
        </div>
      </div>
    </div>
  );
};

export default News;
