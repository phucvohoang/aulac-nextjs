import React from 'react';
import WrapperRouter from '../WrapperRouter/WrapperRouter';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import {
  generateSlugCategoryName,
  getIconImage,
  mapCategory,
} from '../../util/helper';
const ProductsCategory = (props) => {
  const { t } = useTranslation('common');
  const getIcon = (name) => {
    const slugName = generateSlugCategoryName(name.toLowerCase());
    const iconPath = getIconImage(slugName);
    return iconPath;
  };
  const renderCategoryItem = () => {
    //console.log(props)
    const catIdParams = props.currentCategoryId;
    return (props?.categories || []).map((category, idx) => {
      return (
        <li key={idx} className="products__category__item">
          <Link
            href={`/danh-muc/${generateSlugCategoryName(category.name)}`}
            className={catIdParams === category._id ? 'active' : ''}
          >
            {/* {t(mapCategory(category.name))} */}
            <div
              className={`content__category ${
                catIdParams === category._id ? 'active' : ''
              }`}
            >
              <div className="image__box">
                <img src={getIcon(category.name)} />
              </div>
              <div
                className={`text__box ${
                  catIdParams === category._id ? 'active' : ''
                }`}
              >
                <p className="text__box--text">
                  {t(mapCategory(category.name))}
                </p>
              </div>
            </div>
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="products__category__container">
      <div className="products__category__header">
        <h2>{t('category')}</h2>
      </div>
      <div className="products__category__body">
        <ul className="products__category__list">{renderCategoryItem()}</ul>
      </div>
    </div>
  );
};

export default WrapperRouter(ProductsCategory);
