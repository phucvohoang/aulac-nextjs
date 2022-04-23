import React from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import ProductsCategory from '../../components/ProductsCategory/ProductCategory.container.js';
import ProductsList from '../../components/ProductsList/ProductList.container.js';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';
import FeatherIcon from 'feather-icons-react';
// import { useTranslation } from 'react-i18next';
import useTranslation from 'next-translate/useTranslation';
import { generateSlugCategoryName, mapCategory } from '../../util/helper.js';
const Products = ({ slug, categories, region }) => {
  // console.log(props.match.params.cateId)
  const categoryID = (categories || []).find((item) => {
    const slugName = generateSlugCategoryName(item.name) || '';
    return slugName.toLowerCase() === slug.toLowerCase();
  })?._id;
  const { t } = useTranslation('common');
  const renderCategoryItem = () => {
    //console.log(props)
    // let { categories } = props;
    let categories = categories ? categories : [];
    return categories.map((category, idx) => {
      return (
        <Menu.Item key={idx}>
          <Link
            href={`/danh-muc/${generateSlugCategoryName(category.name)}`}
            className={categoryID === category._id ? 'active' : ''}
          >
            {/* {category.name} */}
            {t(mapCategory(category.name))}
          </Link>
        </Menu.Item>
      );
    });
  };
  const menu = (
    <Menu className="products__category__item">{renderCategoryItem()}</Menu>
  );
  const getSlugName = () => {
    const index = (categories || []).findIndex(
      (item) => item._id === categoryID
    );
    if (index >= 0) {
      return generateSlugCategoryName(categories[index].name);
    }
  };
  const slugNameCategory = getSlugName();
  return (
    <div className="products__container">
      <div className="products__header">
        <SectionHeader name={slugNameCategory} title={t('products')} />
      </div>
      <div className="dropdown__mobile__menu">
        <Dropdown overlay={menu} trigger={['click']}>
          <div
            className="site-dropdown-context-menu"
            style={{ backgroundColor: '#fff' }}
          >
            <FeatherIcon icon="menu" />
            <p>{t('category')}</p>
          </div>
        </Dropdown>
      </div>
      <div className="products__body">
        <div className="products__body__left">
          <ProductsCategory categorySlug={slug} />
          {/* <ProductsOnSale/> */}
        </div>
        <div className="products__body__right">
          <ProductsList categoryID={categoryID} region={region} slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default Products;
