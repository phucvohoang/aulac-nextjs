import React, { useEffect } from 'react';
import Head from 'next/head';
import SectionHeader from '../../../components/SectionHeader/SectionHeader.component.jsx';
import ProductsCategory from '../../../components/ProductsCategory/ProductCategory.container.js';
import ProductDetail from '../../../components/ProductDetail/ProductDetail.container.jsx';
import Product from '../../../components/Product/Product.container';
// import { useTranslation } from 'react-i18next';
import useTranslation from 'next-translate/useTranslation';
import ProductDetailDescription from '../../../components/ProductDetailDescription/ProductDetailDescription.component.jsx';

import { initializeApollo } from '../../../lib/apollo';
import {
  LIST_SALE_REGIONS,
  GET_PRODUCT_BY_SLUG,
} from '../../../lib/graphql/queries';
import ClientOnly from '../../../components/Wrapper/fetchingClient.js';
const ProductDetails = (props) => {
  const { isLoggedIn, addRecentlyViewed, getRecentlyView, product } = props;
  useEffect(() => {
    if (isLoggedIn) {
      addRecentlyViewed({
        variables: {
          id: product._id,
        },
      })
        .then()
        .catch((e) => {});
      getRecentlyView();
    }
  }, [isLoggedIn]);
  const { t } = useTranslation('common');
  const renderProductsBody = () => {
    return <div className="products__body__grid">{renderProductList()}</div>;
  };
  const renderProductList = () => {
    const products = props.listViewed;
    if ((products?.length || 0) > 0 && isLoggedIn) {
      return products.map((p, idx) => {
        return <Product key={idx} product={p} />;
      });
    }
  };
  return (
    <>
      <Head>
        <title>{product?.name}</title>
        <meta property="og:image" content={product.images[0]} />
      </Head>
      <div className="products__container">
        <div className="products__header">
          <SectionHeader />
        </div>
        <div className="products__body">
          <div className="products__body__left">
            <ProductsCategory categorySlug={props.categorySlug} />
          </div>
          <div className="products__body__right">
            <ProductDetail {...props} />
            <ProductDetailDescription {...props} />
            <div className="product-detail__description__container">
              <div className="product-detail__description__header">
                <span className="selected--tab--header">
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
    </>
  );
};

export async function getServerSideProps(context) {
  const { params, query } = context;
  const { slug, category } = params;
  let { saleRegion } = query;
  const apolloClient = initializeApollo();
  let product = null;
  try {
    await apolloClient.query({
      query: LIST_SALE_REGIONS,
    });
    const { listSaleRegions: regions } = apolloClient.cache.readQuery({
      query: LIST_SALE_REGIONS,
    });
    if (!saleRegion) {
      saleRegion =
        regions.find((item) => item.name.toLowerCase() === 'hồ chí minh')
          ?._id || '';
    }
    await apolloClient.query({
      query: GET_PRODUCT_BY_SLUG,
      variables: {
        slug,
        saleRegion,
      },
    });
    const { getProductBySlug: dataProduct } = apolloClient.cache.readQuery({
      query: GET_PRODUCT_BY_SLUG,
      variables: {
        slug,
        saleRegion,
      },
    });
    product = {
      ...dataProduct,
      salePrice: dataProduct.salePriceAfterDiscounted,
    };
  } catch (e) {
    console.log('we have an error in Product detail page');
    console.log(e);
  }
  return {
    props: {
      initializeApollo: apolloClient.cache.extract(),
      product,
      categorySlug: category,
    },
  };
}

export default ProductDetails;
