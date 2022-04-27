import React from 'react';

import Product from '../Product/Product.container';
import { Pagination, Row } from 'antd';
class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: {},
      currentPage: 1,
      regionId: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.categoryID !== prevState.categoryID) {
      nextProps.getProduct({
        variables: {
          category: nextProps.categoryID,
          saleRegion: nextProps.regionId,
          page: 1,
          perPage: 24,
        },
      });
      return { categoryID: nextProps.categoryID };
    }
    if (nextProps.regionId !== prevState.regionId) {
      const { getProduct, regionId, categoryID } = nextProps;
      getProduct({
        variables: {
          category: categoryID,
          saleRegion: regionId,
          page: prevState.currentPage,
          perPage: 24,
        },
      });
      return { regionId: nextProps.regionId };
    }
    return null;
  }
  componentDidMount() {
    // console.log('calling did mount')
    const { getProduct, regionId, categoryID } = this.props;
    // console.log(regionId, categoryID)
    getProduct({
      variables: {
        category: categoryID,
        saleRegion: regionId,
        page: this.state.currentPage,
        perPage: 24,
      },
    });
  }
  componentWillUnmount() {
    // console.log('im gonna unmounting')
  }
  renderProductList = () => {
    const { products, addWishList, removeWishList } = this.props;
    // console.log('================ Render Product List ==================');
    // console.log(products)
    return products.map((p, idx) => {
      return (
        <Product
          key={idx}
          product={p}
          addWishList={addWishList}
          removeWishList={removeWishList}
          slug={this.props.slug}
        />
      );
    });
  };

  renderProductsFilter = () => {
    return (
      <div className="products__body__filter">
        <div className="products__filter__sorting">
          <div className="products__sorting__wrapper">
            <div className="filter__sorting--value">
              {this.state.selectedSortingValue}
            </div>
            <div className="filter__sorting--icon">
              <i className="fas fa-chevron-up" />
              <i className="fas fa-chevron-down hide-icon" />
            </div>
            <div className="filter__sorting--list-item">
              <div
                className="filter__sorting--item"
                onClick={(e) => this.sortingItemClick(e)}
              >
                Sort by average rating
              </div>
              <div
                className="filter__sorting--item"
                onClick={(e) => this.sortingItemClick(e)}
              >
                Sort by latest
              </div>
              <div
                className="filter__sorting--item"
                onClick={(e) => this.sortingItemClick(e)}
              >
                Sort by popularity
              </div>
              <div
                className="filter__sorting--item"
                id="sorting__item--low-high"
                onClick={(e) => this.sortingItemClick(e)}
              >
                Sort by price: low to high
              </div>
              <div
                className="filter__sorting--item"
                id="sorting__item--high-low"
                onClick={(e) => this.sortingItemClick(e)}
              >
                Sort by price: high to low
              </div>
            </div>
          </div>
        </div>
        <div className="products__filter__show">
          <span className="products__filter__show--text">
            Showing 1–12 of {this.state.products.length} results
          </span>
          <span
            className="products__filter__show--icon"
            id="grid__view"
            onClick={(e) => this.filterShowIconClick(e)}
          >
            <i className="fas fa-th" id="grid__view--icon" />
          </span>
          {/* <span
                        className="products__filter__show--icon list__view"
                        id="list__view"
                        onClick={e => this.filterShowIconClick(e)}
                    >
                        <i className="fas fa-bars" id="list__view--icon"/>
                    </span> */}
        </div>
      </div>
    );
  };

  renderProductsBody = () => {
    return (
      <div className="products__body__grid">{this.renderProductList()}</div>
    );
  };
  onChangePage = (numberpage) => {
    this.props.getProduct({
      variables: {
        category: this.props.categoryID,
        saleRegion: this.props.regionId,
        page: numberpage,
        perPage: 24,
      },
    });
    this.setState(() => ({ currentPage: numberpage }));
  };
  renderPagination = () => {
    const { totalPages } = this.props;
    if (totalPages > 1) {
      let pagination = [];
      for (let i = 0; i < totalPages; i++) {
        const li = (
          <button
            onClick={() => {
              this.onChangePage(i + 1);
            }}
          >
            {i + 1}
          </button>
        );
        pagination.push(li);
      }
      return pagination;
    }
  };
  render() {
    // console.log(this.state)
    if (this.props.products.length === 0) {
      return <p>Loading...</p>;
    }
    return (
      <React.Fragment>
        {this.renderProductsBody()}
        <Row justify="end">
          <Pagination
            current={this.state.currentPage}
            onChange={this.onChangePage}
            total={this.props.totalDocs}
            pageSize={24}
            showSizeChanger={false}
          />
        </Row>
      </React.Fragment>
    );
  }
}

export default ProductsList;
