import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import TableRow from './TableRow.jsx';
import { addCommas } from '../../util/helper';
import { Row, Space, Select, Col } from 'antd';
import useTranslation from 'next-translate/useTranslation';
const { Option } = Select;
const Table = (props) => {
  const {
    cartItems,
    region,
    listRegions,
    listItemInStock,
    currentUser,
    isLoggedIn,
  } = props;
  const { t } = useTranslation('common');
  // const { currentUser } = checkAuth();
  // console.log('========= User =============');
  // console.log(currentUser);
  // console.log(region);
  // console.log(listItemInStock);
  useEffect(() => {
    // const details = convertCartToRequestBody(cartItems);
    props.recheckInStock(cartItems);
  }, []);
  const cart = Object.keys(cartItems);
  const renderTableContent = (isMobile) => {
    if (cart.length > 0) {
      return cart.map((key) => (
        <TableRow
          key={key}
          isMobile={isMobile}
          product={cartItems[key]}
          update={props.update}
          remove={props.remove}
          listItemInStock={listItemInStock}
        />
        // <tr key={key}>
        //     <td className="table-remove">
        //         <button onClick={()=> {props.remove(cartItems[key])}}>
        //             <i className="fa fa-trash"></i>
        //         </button>
        //     </td>
        //     <td className="table-image">
        //         <Link href{`/product/${key}`}>
        //             <img src={cartItems[key].image} alt={cartItems[key].name} />
        //         </Link>
        //     </td>
        //     <td className="table-p-name"><Link href{`/product/${key}`}>{cartItems[key].name}</Link></td>
        //     <td className="table-p-price"><p>{cartItems[key].price}đ</p></td>
        //     <td className="table-p-qty"><input value="1" onChange={()=>{}} name="cart-qty" type="number" /></td>
        //     <td className="table-total"><p>{(cartItems[key].price * cartItems[key].quantity)}đ</p></td>
        // </tr>
      ));
    }
  };
  const renderTotalPrice = () => {
    if (cart.length > 0) {
      return cart.reduce((accum, current) => {
        return (accum =
          accum + cartItems[current].salePrice * cartItems[current].quantity);
      }, 0);
    }
    return 0;
  };
  const renderShowroomHelper = () => {
    // Get region that selected
    // // console.log(region);
    // console.log(region?.branches);
    return (region?.branches ?? [])
      .filter((item) => !item.disabled)
      .map((branch) => {
        return (
          <Option key={branch._id} value={branch._id}>
            {branch.name} - {branch.address.addressNo}{' '}
          </Option>
        );
      });
  };
  const handleChangeShowroom = (value) => {
    // console.log(value);
    const getBranch = region.branches.find((item) => item._id === value);
    // console.log(getBranch);
    const newRegion = { ...region, selectedBrand: getBranch };
    props.chooseRegion(newRegion);
  };

  const isHasItemOutOfStock =
    Object.keys(listItemInStock).length > 0
      ? Object.keys(listItemInStock).some(
          (key) => listItemInStock[key] === false
        )
      : true;
  return (
    <>
      <div className="cart-area table-area" style={{ backgroundColor: '#fff' }}>
        <Row
          style={{
            backgroundColor: '#fff',
            width: '100%',
            padding: '20px 15px 0px',
          }}
        >
          <Col span={24}>
            <Row>
              <Col xs={24} md={8}>
                <p style={{ textAlign: 'left' }}>{t('cartpage.createdAt')}:</p>
              </Col>
              <Col xs={24} md={12}>
                <p style={{ textAlign: 'left', fontWeight: 'bold' }}>
                  {props.region?.selectedBrand?.address?.addressNo}
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row align="middle" justify="start" style={{ margin: '15px 0' }}>
              <Col xs={24} md={6}>
                <p style={{ textAlign: 'left' }}>
                  {t('cartpage.changeShowroom')}:{' '}
                </p>
              </Col>
              <Col xs={24} md={14}>
                <Select
                  style={{ width: '100%' }}
                  onChange={handleChangeShowroom}
                  value={props.region?.selectedBrand?._id}
                >
                  {renderShowroomHelper()}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="container" style={{ margin: '2rem 0 5rem' }}>
          <div className="table-responsive">
            <table className="table product-table text-center desktop">
              <thead>
                <tr>
                  <th className="table-remove">
                    {t('cartpage.tableOrder.remove')}
                  </th>
                  <th className="table-image">
                    {t('cartpage.tableOrder.image')}
                  </th>
                  <th className="table-p-name">
                    {t('cartpage.tableOrder.product')}
                  </th>
                  <th className="table-p-price">
                    {t('cartpage.tableOrder.price')}
                  </th>
                  <th className="table-p-qty">
                    {t('cartpage.tableOrder.quantity')}
                  </th>
                  <th className="table-total">
                    {t('cartpage.tableOrder.total')}
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableContent()}</tbody>
            </table>
            <table className="table product-table text-center mobile">
              <thead>
                <tr>
                  <th className="table-remove">
                    {t('cartpage.tableOrder.remove')}
                  </th>
                  <th className="table-image">
                    {t('cartpage.tableOrder.product')}
                  </th>
                  <th className="table-p-name">
                    {t('cartpage.tableOrder.total')}
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableContent(true)}</tbody>
            </table>
          </div>
          {/* <div className="table-bottom-wrapper">
                    <div className="table-coupon d-flex fix justify-content-start">
                        <input type="text" placeholder="Coupon code" />
                        <button type="submit">Apply coupon</button>
                    </div>
                    <div className="table-update d-flex justify-content-end">
                        <button type="button" disabled>Update cart</button>
                    </div>
                </div> */}
        </div>
        <div className="container">
          <div
            className="table-total-wrapper d-flex"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <div className="table-total-content">
              <h2>{t('cartpage.cartTotal')}</h2>
              <div className="table-total-amount">
                <div className="single-total-content d-flex justify-content-between">
                  <span>{t('cartpage.subTotal')}</span>
                  <span className="c-total-price">
                    {addCommas(renderTotalPrice())}đ
                  </span>
                </div>
                {/* <div className="single-total-content d-flex justify-content-between">
                                <span>Shipping</span>
                                <span className="c-total-price"><span>Phí Ship:</span> 5000 đ</span>
                            </div> */}
                <div className="single-total-content d-flex justify-content-between">
                  <span>{t('cartpage.tableOrder.total')}</span>
                  <span className="c-total-price">
                    {addCommas(renderTotalPrice())}đ
                  </span>
                </div>
                {Object.keys(cartItems)?.length > 0 ? (
                  isHasItemOutOfStock ? (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {t('cartpage.outOfStockWarn')}
                    </p>
                  ) : isLoggedIn ? (
                    <Link href="/checkout">{t('cartpage.checkout')}</Link>
                  ) : (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                      {t('cartpage.loginWarn')}
                    </p>
                  )
                ) : (
                  <p style={{ color: 'red', textAlign: 'center' }}>
                    {t('cartpage.emptyWarn')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
