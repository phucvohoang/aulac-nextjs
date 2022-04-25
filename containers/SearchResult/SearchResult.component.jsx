import React from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import ProductsCategory from '../../components/ProductsCategory/ProductCategory.container.js';
import Product from '../../components/Product/Product.container';
import WrapperTranslate from '../../components/WrapperTranslate/WrapperTranslate.js';
// import { withTranslation } from 'react-i18next';
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }
  renderProductsBody = () => {
    return (
      <div className="products__body__grid">{this.renderProductList()}</div>
    );
  };
  renderProductList = () => {
    const { products } = this.props;
    if (products?.length) {
      return products.map((p, idx) => {
        return <Product key={idx} product={p} />;
      });
    } else {
      return (
        <p
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#fff',
            width: '100%',
          }}
        >
          {this.props.t('notFoundProduct')}
        </p>
      );
    }
  };
  render() {
    return (
      <div className="products__container">
        <div className="products__header">
          <SectionHeader
            title={`${this.props.t('keyword')}: ${this.props.keyword}`}
          />
        </div>
        <div className="products__body">
          <div className="products__body__left">
            <ProductsCategory />
          </div>
          <div className="products__body__right">
            {this.renderProductsBody()}
          </div>
        </div>
      </div>
    );
  }
}

export default WrapperTranslate(SearchResult);
