import React, { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import ProductsCategory from '../../components/ProductsCategory/ProductCategory.container.js';
import ProductDetail from '../../components/ProductDetail/ProductDetail.container.jsx';
import Product from '../../components/Product/Product.container';
import { useTranslation } from 'react-i18next';
import ProductDetailDescription from '../../components/ProductDetailDescription/ProductDetailDescription.component.jsx';
const ProductDetails = (props) => {
  const { isLoggedIn, addRecentlyViewed, getRecentlyView, product } = props;
  useEffect(()=>{
    if(isLoggedIn) {
      addRecentlyViewed({
        variables: {
          id: product._id
        }
      }).then()
      .catch(e => {
      })
      getRecentlyView()
    }
    
  },[isLoggedIn])
  const { t } = useTranslation('common');
  const renderProductsBody = () => {
    return <div className="products__body__grid">{renderProductList()}</div>;
  };
  const renderProductList = () => {
    const products = props.listViewed
    if (products.length > 0 && isLoggedIn) {
      return products.map((p, idx) => {
        return <Product key={idx} product={p} />;
      });
    }
  };
  return (
    <div className="products__container">
      <div className="products__header">
        <SectionHeader />
      </div>
      <div className="products__body">
        <div className="products__body__left">
          <ProductsCategory />
          {/* <ProductsOnSale/> */}
        </div>
        <div className="products__body__right">
          <ProductDetail {...props} />
          <ProductDetailDescription {...props} />
          <div className="product-detail__description__container">
            <div className="product-detail__description__header">
              <span
                className="selected--tab--header"
              >
                {t('seenProduct')}
              </span>
            </div>
            <div className="product-detail__description__body">
              {renderProductsBody()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
