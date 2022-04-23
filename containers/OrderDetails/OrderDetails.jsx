import React from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import { Row, Col, Space, Spin, Card, Table, Divider } from 'antd';
import { addCommas } from '../../util/helper';
import QRCode from 'qrcode.react';
import { useTranslation } from 'react-i18next';
const convertAdress = (address) => {
  if (address) {
    const { addressNo } = address;
    return `${addressNo}`;
  }
  return '';
};
const OrderDetail = (props) => {
  const { t } = useTranslation('common');
  const { order } = props;
  const details = order?.details ? order.details : [];
  let destination = convertAdress(order?.shippingAddress);
  const datasource = details.map((item) => {
    const {
      product,
      quantity,
      salePriceAfterDiscounted,
      discountType,
      discountValue,
      salePrice,
    } = item;
    let discount = '';
    if (discountValue) {
      discount = `${discountValue}${discountType === 'fixed' ? 'đ' : '%'}`;
    }
    return {
      productName: product.name,
      quantity,
      salePriceAfterDiscounted: `${addCommas(salePriceAfterDiscounted)}đ`,
      discount: discount ? discount : 'Không',
      salePrice: `${addCommas(salePrice)}đ`,
    };
  });
  const columns = [
    {
      title: t('checkoutpage.item'),
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: t('checkoutpage.price'),
      dataIndex: 'salePrice',
      key: 'salePrice',
    },
    {
      title: t('checkoutpage.quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: t('checkoutpage.discount'),
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: t('checkoutpage.total'),
      dataIndex: 'salePriceAfterDiscounted',
      key: 'salePriceAfterDiscounted',
      align: 'right',
    },
  ];
  return (
    <div className="news__container">
      <div className="news__header">
        <SectionHeader title={t('checkoutpage.orderDetail')} />
      </div>
      <div className="orderDetails__page">
        {props.isLoggedIn ? (
          order ? (
            <div className="content__orderDetail">
              <Row gutter={15} style={{ width: '100%' }}>
                <Col span={24}>
                  <Card title={t('checkoutpage.customerInfor')}>
                    <Row>
                      <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <h4>{t('checkoutpage.customerName')}: </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.customer.name
                              ? order?.customer.name
                              : t('checkoutpage.empty')}
                          </p>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <h4>Email: </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.customer.email
                              ? order?.customer.email
                              : t('checkoutpage.empty')}
                          </p>
                        </Space>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <h4>{t('checkoutpage.phone')}: </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.customer.phone
                              ? order?.customer.phone
                              : t('checkoutpage.empty')}
                          </p>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <h4>{t('checkoutpage.address')}: </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {destination
                              ? destination
                              : t('checkoutpage.empty')}
                          </p>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <h4>{t('checkoutpage.orderCode')}: </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.orderCode ? order?.orderCode : 'Lỗi'}
                          </p>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <h4>VAT: </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.isRequiredVatInvoice
                              ? t('checkoutpage.requiredVat')
                              : t('checkoutpage.notVat')}
                          </p>
                        </Space>
                      </Col>
                      {order?.isRequiredVatInvoice && (
                        <Row style={{ width: '100%', marginTop: '30px' }}>
                          <Divider orientation="left">
                            {t('checkoutpage.companyInfor')}
                          </Divider>
                          <Col span={12}>
                            <Space size="large" style={{ marginTop: '30px' }}>
                              <h4>{t('checkoutpage.companyName')}: </h4>
                              <p style={{ marginBottom: '0.5em' }}>
                                {order?.vatInvoiceCompanyName
                                  ? order?.vatInvoiceCompanyName
                                  : t('checkoutpage.empty')}
                              </p>
                            </Space>
                          </Col>
                          <Col span={12}>
                            <Space size="large" style={{ marginTop: '30px' }}>
                              <h4>{t('checkoutpage.taxNumber')}: </h4>
                              <p style={{ marginBottom: '0.5em' }}>
                                {order?.vatInvoiceCompanyTaxCode
                                  ? order?.vatInvoiceCompanyTaxCode
                                  : t('checkoutpage.empty')}
                              </p>
                            </Space>
                          </Col>
                          <Col span={12}>
                            <Space size="large" style={{ marginTop: '30px' }}>
                              <h4>{t('checkoutpage.companyAddress')}: </h4>
                              <p style={{ marginBottom: '0.5em' }}>
                                {order?.vatInvoiceCompanyAddress
                                  ? order?.vatInvoiceCompanyAddress
                                  : t('checkoutpage.empty')}
                              </p>
                            </Space>
                          </Col>
                        </Row>
                      )}
                      <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <QRCode
                            value={`https://www.aulacshop.com/order/${props.orderId}`}
                            size={128}
                            bgColor={'#ffffff'}
                            fgColor={'#000000'}
                            level={'L'}
                            includeMargin={false}
                            renderAs={'svg'}
                            imageSettings={{
                              src: 'https://aulacshop.com/favicon.ico',
                              x: null,
                              y: null,
                              height: 24,
                              width: 24,
                              excavate: true,
                            }}
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <div style={{ margin: '20px 0' }}>
                <Row gutter={15} style={{ width: '100%' }}>
                  <Col span={24}>
                    <Card title={t('checkoutpage.productsList')}>
                      <Row>
                        <Col span={24}>
                          <Table
                            pagination={false}
                            dataSource={datasource}
                            columns={columns}
                            summary={() => (
                              <>
                                <Table.Summary.Row>
                                  <Table.Summary.Cell index={0}>
                                    {t('checkoutpage.coupon')}
                                  </Table.Summary.Cell>
                                  <Table.Summary.Cell
                                    align="right"
                                    index={4}
                                    colSpan={4}
                                  >
                                    {order.discountCode ? (
                                      <p style={{ color: 'goldenrod' }}>
                                        {order.discountCode}
                                      </p>
                                    ) : (
                                      t('checkoutpage.empty')
                                    )}
                                  </Table.Summary.Cell>
                                </Table.Summary.Row>
                                {order.discountCode && (
                                  <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>
                                      {t('checkoutpage.discount')}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell
                                      align="right"
                                      index={4}
                                      colSpan={4}
                                    >
                                      <p style={{ color: 'goldenrod' }}>
                                        {`${order.discountValue}${
                                          order.discountType === 'fixed'
                                            ? 'đ'
                                            : '%'
                                        }`}
                                      </p>
                                    </Table.Summary.Cell>
                                  </Table.Summary.Row>
                                )}
                                <Table.Summary.Row>
                                  <Table.Summary.Cell index={0}>
                                    <p style={{ color: 'goldenrod' }}>
                                      {t('checkoutpage.total')}
                                    </p>
                                  </Table.Summary.Cell>
                                  <Table.Summary.Cell
                                    align="right"
                                    index={4}
                                    colSpan={4}
                                  >
                                    <p style={{ color: 'goldenrod' }}>
                                      {addCommas(order?.totalAmountFinal)}đ
                                    </p>
                                  </Table.Summary.Cell>
                                </Table.Summary.Row>
                              </>
                            )}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <Spin />
          )
        ) : (
          <div className="content__login">
            <p className="message__orderdetail">Xin Vui Lòng Đăng Nhập</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
/*


*/
