import React from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import ProductsCategory from '../../components/ProductsCategory/ProductCategory.container.js';
import Product from '../../components/Product/Product.container';
import { withTranslation } from 'react-i18next';
class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }
  // static getDerivedStateFromProps(nextProps, prevState){
  //     //console.log('calling getDerive')
  //     if(nextProps.keyword !== prevState.keyword){
  //         const { regionID, searchProducts} = nextProps;
  //         searchProducts({
  //             variables: {
  //                 saleRegion: regionID,
  //             }
  //         })
  //         return { keyword: nextProps.keyword};
  //    }
  //     return null;
  // }
  componentDidMount() {
    const { regionID, keyword, searchProducts } = this.props;
    // //console.log(regionID);

    searchProducts({
      variables: {
        saleRegion: '5fcde10c9a077969afd9daf2',
      },
    });
  }
  renderProductsBody = () => {
    return (
      <div className="products__body__grid">{this.renderProductList()}</div>
    );
  };
  renderProductList = () => {
    const { products } = this.props;
    if (products.length > 0) {
      return products.map((p, idx) => {
        return <Product key={idx} product={p} />;
      });
    } else {
      return (
        <p
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '2rem',
            width: '100%',
          }}
        >
          {this.props.t('empty')}
        </p>
      );
    }
  };
  render() {
    return (
      <div className="products__container">
        <div className="products__header">
          <SectionHeader title={`Flash Sale`} />
        </div>
        <div className="products__body">
          <div className="products__body__left">
            <ProductsCategory />
            {/* <ProductsOnSale/> */}
          </div>
          <div className="products__body__right">
            {this.renderProductsBody()}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(SearchResult);
