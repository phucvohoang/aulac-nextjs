import React from 'react';
import Link from 'next/link';
import { addCommas, generateSlugCategoryName } from '../../util/helper';
import { getItem } from '../../util/localStorage';
class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.product.quantity,
      isModified: false,
    };
  }
  increase = () => {
    const { quantity } = this.state;
    this.setState(() => {
      return {
        quantity: quantity + 1,
        isModified: true,
      };
    });
  };

  decrease = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState(() => {
        return {
          quantity: quantity - 1,
          isModified: true,
        };
      });
    }
  };
  cancel = () => {
    this.setState(() => {
      return {
        quantity: this.props.product.quantity,
        isModified: false,
      };
    });
  };
  update = () => {
    const newItem = {
      ...this.props.product,
      quantity: this.state.quantity,
    };
    // // console.log(newItem)
    this.props.update(newItem);
    this.setState(() => {
      return {
        isModified: false,
      };
    });
  };

  render() {
    const { product, remove, listItemInStock } = this.props;
    // // console.log(product)
    const { quantity } = this.state;
    console.log(this.props.product);
    // console.log(listItemInStock);
    const img = product.images ? product.images[0] : '';
    const region = getItem('region');
    if (this.props.isMobile) {
      return (
        <tr key={product.id}>
          <td className="table-remove">
            <button
              onClick={() => {
                remove(product);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
          <td className="table-p-name">
            <div>
              <div className="table-image">
                <Link
                  href={`/san-pham/${generateSlugCategoryName(
                    product?.category?.name
                  )}/${product.slug}/${region._id}`}
                >
                  <img src={img} alt={product.name} />
                </Link>
              </div>
              <p style={{ margin: '15px 0px' }}>
                <Link
                  href={`/san-pham/${generateSlugCategoryName(
                    product?.category?.name
                  )}/${product.slug}/${region._id}`}
                >
                  {product.name}
                </Link>{' '}
                - {addCommas(product.salePrice)}đ
              </p>
              <p style={{ margin: '15px 0px', color: 'goldenrod' }}>
                Giá: {addCommas(product.salePrice)}đ
              </p>
              <div className="table-p-qty">
                <div className="table__actions">
                  <button
                    className={
                      this.state.isModified ? 'btn btn-cancel active' : 'btn'
                    }
                    onClick={this.cancel}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <div className="table__actions--change">
                    <button onClick={this.decrease}>-</button>
                    <span>{quantity}</span>
                    <button onClick={this.increase}>+</button>
                  </div>
                  <button
                    className={
                      this.state.isModified ? 'btn btn-check active' : 'btn'
                    }
                    onClick={this.update}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                </div>
              </div>
            </div>
          </td>

          {/* <td className="table-p-qty">
                        <div className="table__actions">
                            <button className={this.state.isModified ? 'btn btn-cancel active': 'btn'} onClick={this.cancel}>
                                <i className="fas fa-times"></i>
                            </button>
                            <div className="table__actions--change">
                                <button onClick={this.decrease}>-</button>
                                <span>{quantity}</span>
                                <button onClick={this.increase}>+</button>
                            </div>
                            <button className={this.state.isModified ? 'btn btn-check active': 'btn'} onClick={this.update}>
                                <i className="fas fa-check"></i>
                            </button>
                        </div>
                    </td> */}
          <td className="table-total">
            <p>{addCommas(product.salePrice * product.quantity)}đ</p>
          </td>
        </tr>
      );
    }
    return (
      <tr key={product.id}>
        <td className="table-remove">
          <button
            onClick={() => {
              remove(product);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
        <td className="table-image">
          <Link
            href={`/san-pham/${generateSlugCategoryName(
              product?.category?.name
            )}/${product.slug}/${region._id}`}
          >
            <img src={img} alt={product.name} />
          </Link>
        </td>
        <td className="table-p-name">
          <Link
            href={`/san-pham/${generateSlugCategoryName(
              product?.category?.name
            )}/${product.slug}/${region._id}`}
          >
            {product.name}
          </Link>
        </td>
        <td className="table-p-price">
          <p>{addCommas(product.salePrice)}đ</p>
        </td>
        <td className="table-p-qty">
          <div className="table__actions">
            <button
              className={
                this.state.isModified ? 'btn btn-cancel active' : 'btn'
              }
              onClick={this.cancel}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="table__actions--change">
              <button onClick={this.decrease}>-</button>
              <span>{quantity}</span>
              <button onClick={this.increase}>+</button>
            </div>
            <button
              className={this.state.isModified ? 'btn btn-check active' : 'btn'}
              onClick={this.update}
            >
              <i className="fas fa-check"></i>
            </button>
          </div>
          {!listItemInStock[product._id] && (
            <p
              style={{
                color: 'red',
                margin: '10px auto',
                textAlign: 'center',
                fontSize: '10px',
              }}
            >
              Sản Phẩm không đủ hoặc đã hết hàng
            </p>
          )}
        </td>
        <td className="table-total">
          <p>{addCommas(product.salePrice * product.quantity)}đ</p>
        </td>
      </tr>
    );
  }
}

export default TableRow;
