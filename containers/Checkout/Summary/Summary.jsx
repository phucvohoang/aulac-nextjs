import React from 'react';
import {
  Table,
  Row,
  Col,
  Card,
  Divider,
  Space,
  Button,
  Modal,
  notification,
} from 'antd';
// import { withRouter } from 'react-router-dom';
import { addCommas } from '../../../util/helper';
import { getItem } from '../../../util/localStorage';
import {
  createNewOrderOnFirebase,
  // firestore,
} from '../../../firebase/firebase.util';
import { handleCheckoutSuccess } from '../../../lib/graphql/resolvers/utils';
import WrapperRouter from '../../../components/WrapperRouter/WrapperRouter';
import WrapperTranslate from '../../../components/WrapperTranslate/WrapperTranslate';
// import { withTranslation } from 'react-i18next';
class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      currentDataForm: null,
      isCheckingout: false,
      requestData: null,
      confirmLoading: false,
    };
    this.columns = [
      {
        title: props.t('checkoutpage.item'),
        dataIndex: 'name',
        key: 'name',
        // width: 500,
        fixed: 'left',
        // with: 200,
      },
      {
        title: props.t('checkoutpage.price'),
        dataIndex: 'salePrice',
        key: 'salePrice',
        responsive: ['md'],
      },
      {
        title: props.t('checkoutpage.quantity'),
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: props.t('checkoutpage.isVat'),
        dataIndex: 'vat',
        key: 'vat',
        responsive: ['md'],
      },
      {
        title: props.t('checkoutpage.total'),
        dataIndex: 'total',
        key: 'total',
        align: 'right',
      },
    ];
  }

  componentDidMount() {
    console.log('CAlling Did MOunt');
    const checkout = this.props.checkoutData;
    const region = getItem('region');
    console.log(checkout);
    console.log(this.props.totalAmountFinal);
    if (checkout) {
      const totalAmountFinal = this.props.totalAmountFinal;
      const order = {
        ...checkout,
        totalAmountFinal,
        shippingFee: +Date.now().toString().slice(-9), // This is a hack, to bypass Apollo Cache. This field has no meaning for the server, so we use it as a "change field" to trigger Apollo query
      };
      delete order.name;
      delete order.email;
      delete order.phone;
      const payload = {
        ...order,
        branch: region.selectedBrand._id,
      };
      console.log(payload);
      this.props.calculateShippingFee({
        variables: { order: payload },
        fetchPolicy: 'network-only',
      });
    }
  }
  componentWillUnmount() {
    console.log('unmounting');
  }

  renderOrderBody = () => {
    const { cartItems } = this.props;
    const cart = cartItems ? Object.keys(cartItems) : [];
    if (cart.length > 0) {
      return cart.map((key, idx) => {
        // ////console.log(cartItems[key])
        // const tax = cartItems[key].salePrice * 0.1;
        const {
          name,
          quantity,
          appliedVAT,
          salePrice,
          salePriceAfterDiscounted,
        } = cartItems[key];
        ////console.log(salePrice, salePriceAfterDiscounted);
        let salePriceFinal =
          salePrice > salePriceAfterDiscounted
            ? salePriceAfterDiscounted
            : salePrice;
        let vat = appliedVAT ? salePriceFinal * 0.1 : 0;

        let total = addCommas(quantity * (vat + salePriceFinal));
        return {
          id: idx,
          name,
          quantity,
          salePrice: addCommas(salePriceFinal),
          vat: addCommas(vat),
          total,
        };
      });
    } else {
      return [];
    }
  };
  handleClickButtonPayment = () => {
    if (this.props?.totalAmountFinal >= 1000000) {
      this.setState(() => ({ isModalVisible: true }));
    }
  };
  handleOk = () => {
    ////console.log(this.state.requestData);
    this.setState(() => ({ confirmLoading: true }));
    return this.handleFinish(this.state.requestData);
  };
  handleCancel = () => {
    this.setState(() => ({ isModalVisible: false, isCheckingout: false }));
  };
  clearLocalCart = () => {
    handleCheckoutSuccess();
    this.props.router.push('/');
  };
  handleCheckout = async (requestData) => {
    try {
      const user = this.props.currentUser;
      //console.log('======== Request Data =======');
      //console.log(requestData);
      this.props
        .checkout({
          variables: { customerCreateOrderInput: requestData },
        })
        .then((res) => {
          ////console.log(res);
          const { customerCreateOrder } = res.data;
          // const { info } = user;
          ////console.log('=============== Order details ==============');
          ////console.log(customerCreateOrder);
          const payload = {
            orderCode: customerCreateOrder.orderCode,
            totalAmountFinal: customerCreateOrder.totalAmountFinal,
            orderId: customerCreateOrder._id,
            email: user.email,
            seen: false,
            branch: customerCreateOrder?.branch?._id ?? '',
            createdAt: Date.now(),
            user: {
              avatar: user.avatar ? user.avatar : 'empty',
              email: user.email,
              uid: user._id,
            },
          };
          ////console.log(payload);
          createNewOrderOnFirebase(payload)
            .then(() => {
              this.setState(() => ({ isCheckingout: false }));
              this.props
                .clearDataCartItems()
                .then(() => {
                  this.clearLocalCart();
                })
                .catch((e) => {
                  ////console.log('Could not clear data cart item');
                });
              notification.success({
                message: this.props.t('success'),
                description: this.props.t('successPayment'),
              });
            })
            .catch((e) => {
              console.error(e);
              notification.error({
                message: this.props.t('fail'),
                description: this.props.t('failDescription'),
              });
            });
          // firestore
          //   .collection('orders-notification')
          //   .add(payload)
          //   .then(() => {
          //     this.setState(() => ({ isCheckingout: false }));
          //     this.props
          //       .clearDataCartItems()
          //       .then(() => {
          //         this.clearLocalCart();
          //       })
          //       .catch((e) => {
          //         ////console.log('Could not clear data cart item');
          //       });
          //     notification.success({
          //       message: 'Hoàn Tất Thanh Toán',
          //       description:
          //         'Bạn đã hoàn tất đơn hàng, mã đơn hàng đã đươc lưu vào Profile của bạn',
          //     });
          //   })
          //   .catch((e) => {
          //     console.error(e);
          //     notification.error({
          //       message: 'Thất Bại',
          //       description: 'Bạn không thể thực hiện thanh toán',
          //     });
          //   });
        })
        .catch((e) => {
          this.setState(() => ({ isCheckingout: false }));
          ////console.log(
          //   '======= Shit could not made the fucking last step =========='
          // );
          console.error(e);
          notification.error({
            message: this.props.t('fail'),
            description: this.props.t('failDescription'),
          });
        });
    } catch (e) {
      ////console.log('We have an Error when checkout');
    }
  };
  handleFinish = () => {
    this.setState(() => ({ isCheckingout: true }));
    const order = this.props.checkoutData;
    const { shippingFee = '' } = this.props.shippingFeeResponse;
    const requestData = { ...order };

    if (shippingFee) {
      requestData.shippingFee = shippingFee;
      const region = getItem('region');
      requestData.branch = region.selectedBrand._id;
    }
    requestData.recipientName = requestData.name;
    requestData.recipientPhone = requestData.phone;
    delete requestData.name;
    delete requestData.email;
    delete requestData.phone;
    ////console.log(requestData);
    if (this.props.totalAmountFinal >= 1000000 && !this.state.isModalVisible) {
      this.setState(() => ({
        isModalVisible: true,
        requestData,
      }));
    } else {
      this.handleCheckout(requestData);
    }
  };

  render() {
    const datasource = this.renderOrderBody();
    // const order = {};
    const order = this.props.checkoutData;
    const destination = getItem('destinationShipping')?.fullAddress;
    const { totalAmountFinal, shippingFeeResponse, t } = this.props;
    console.log(shippingFeeResponse);
    return (
      <>
        <Modal
          title={t('checkoutpage.warn')}
          visible={this.state.isModalVisible}
          confirmLoading={this.state.confirmLoading}
          okText={t('checkoutpage.ok')}
          cancelText={t('checkoutpage.cancel')}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {t('checkoutpage.warnCheckout')}
        </Modal>
        <h3 className="heading">{t('checkoutpage.orderInformation.title')}</h3>
        <div style={{ margin: '20px 0' }}>
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              <Card title={t('checkoutpage.orderInformation.customerInfor')}>
                <Row>
                  <Col xs={24} span={12}>
                    <Space size="large" style={{ marginTop: '30px' }} wrap>
                      <h4 style={{ fontWeight: 'bold' }}>
                        {t('checkoutpage.orderInformation.customerName')}:{' '}
                      </h4>
                      <p style={{ marginBottom: '0.5em' }}>
                        {order?.name ? order?.name : t('checkoutpage.empty')}
                      </p>
                    </Space>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} span={12}>
                    <Space size="large" style={{ marginTop: '30px' }} wrap>
                      <h4 style={{ fontWeight: 'bold' }}>
                        {t('checkoutpage.phone')}:{' '}
                      </h4>
                      <p style={{ marginBottom: '0.5em' }}>
                        {order?.phone ? order?.phone : t('checkoutpage.empty')}
                      </p>
                    </Space>
                  </Col>
                  <Col xs={24} span={12}>
                    <Space size="large" style={{ marginTop: '30px' }} wrap>
                      <h4 style={{ fontWeight: 'bold' }}>
                        {t('checkoutpage.address')}:{' '}
                      </h4>
                      <p style={{ marginBottom: '0.5em' }}>
                        {destination ? destination : t('checkoutpage.empty')}
                      </p>
                    </Space>
                  </Col>

                  <Col xs={24} span={12}>
                    <Space size="large" style={{ marginTop: '30px' }} wrap>
                      <h4 style={{ fontWeight: 'bold' }}>
                        {t('checkoutpage.vat')}:{' '}
                      </h4>
                      <p style={{ marginBottom: '0.5em' }}>
                        {order?.isRequiredVatInvoice
                          ? t('checkoutpage.requiredVat')
                          : t('checkoutpage.notVat')}
                      </p>
                    </Space>
                  </Col>
                  {order?.isRequiredVatInvoice && (
                    <Row style={{ width: '100%', marginTop: '30px' }} wrap>
                      <Divider orientation="left">
                        {t('checkoutpage.companyInfor')}
                      </Divider>
                      <Col xs={24} span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <h4 style={{ fontWeight: 'bold' }}>
                            {t('checkoutpage.companyName')}:{' '}
                          </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.vatInvoiceCompanyName
                              ? order?.vatInvoiceCompanyName
                              : t('checkoutpage.empty')}
                          </p>
                        </Space>
                      </Col>
                      <Col xs={24} span={12}>
                        <Space size="large" style={{ marginTop: '30px' }} wrap>
                          <h4 style={{ fontWeight: 'bold' }}>
                            {t('checkoutpage.taxNumber')}:{' '}
                          </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.vatInvoiceCompanyTaxCode
                              ? order?.vatInvoiceCompanyTaxCode
                              : t('checkoutpage.empty')}
                          </p>
                        </Space>
                      </Col>
                      <Col xs={24} span={12}>
                        <Space size="large" style={{ marginTop: '30px' }} wrap>
                          <h4 style={{ fontWeight: 'bold' }}>
                            {t('checkoutpage.companyAddress')}:{' '}
                          </h4>
                          <p style={{ marginBottom: '0.5em' }}>
                            {order?.vatInvoiceCompanyAddress
                              ? order?.vatInvoiceCompanyAddress
                              : t('checkoutpage.empty')}
                          </p>
                        </Space>
                      </Col>
                    </Row>
                  )}
                  {/* <Col span={12}>
                        <Space size="large" style={{ marginTop: '30px' }}>
                          <QRCode
                            value={'https://www.aulacshop.com'}
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
                      </Col> */}
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Row gutter={15} style={{ width: '100%' }}>
            <Col span={24}>
              <Card title={t('checkoutpage.productsList')}>
                <Row>
                  <Col span={24}>
                    <Table
                      pagination={false}
                      dataSource={datasource}
                      columns={this.columns}
                      rowKey={(record) => record.id}
                      summary={() => (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell
                              align="left"
                              colSpan={2}
                              index={0}
                            >
                              {t('checkoutpage.coupon')}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                              align="right"
                              index={4}
                              colSpan={3}
                            >
                              {order.discountCode ? (
                                <p style={{ color: 'goldenrod' }}>
                                  {order.discountCode}
                                </p>
                              ) : (
                                `${t('checkoutpage.empty')}`
                              )}
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell
                              align="left"
                              colSpan={2}
                              index={0}
                            >
                              {t('checkoutpage.subTotal')}
                              {/* <p style={{ color: 'goldenrod' }}>Tạm Tính</p> */}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                              align="right"
                              index={3}
                              colSpan={4}
                              style={{ color: 'goldenrod' }}
                            >
                              {/* {addCommas(
                                  this.props?.totalAmountFinal
                                    ? this.props.totalAmountFinal
                                    : 0
                                )}
                                đ */}
                              <p
                                style={{
                                  color: 'goldenrod',
                                  textAlign: 'right',
                                }}
                              >
                                {addCommas(
                                  this.props?.totalAmountFinal
                                    ? this.props.totalAmountFinal
                                    : 0
                                )}
                                đ
                              </p>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>

                          <Table.Summary.Row>
                            <Table.Summary.Cell
                              align="left"
                              colSpan={2}
                              index={0}
                            >
                              {t('checkoutpage.shippingFee')}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                              align="right"
                              index={4}
                              colSpan={3}
                            >
                              <p
                                style={{
                                  color: 'goldenrod',
                                  textAlign: 'right',
                                }}
                              >
                                {shippingFeeResponse.shippingFee
                                  ? addCommas(shippingFeeResponse.shippingFee) +
                                    'đ'
                                  : 'Đang tính toán...'}
                              </p>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>

                          <Table.Summary.Row>
                            <Table.Summary.Cell
                              align="left"
                              colSpan={2}
                              index={0}
                            >
                              {/* <p style={{ color: 'goldenrod' }}>Tổng Đơn</p> */}
                              {t('checkoutpage.total')}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                              align="right"
                              index={4}
                              colSpan={3}
                            >
                              <p
                                style={{
                                  color: 'goldenrod',
                                  textAlign: 'right',
                                }}
                              >
                                {addCommas(
                                  totalAmountFinal +
                                    shippingFeeResponse.shippingFee ?? 0
                                )}
                                đ
                              </p>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>
                              {/* <p style={{ color: 'goldenrod' }}>Tổng Đơn</p> */}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell
                              align="right"
                              index={4}
                              colSpan={4}
                            >
                              <Space size="large">
                                <Button
                                  onClick={this.props.backToLastStep}
                                  htmlType="button"
                                  type="ghost"
                                >
                                  {t('checkoutpage.back')}
                                </Button>
                                <Button
                                  loading={this.state.isCheckingout}
                                  onClick={this.handleFinish}
                                  style={{
                                    backgroundColor: 'goldenrod',
                                    color: '#fff',
                                    border: 'none',
                                    outline: 'none',
                                  }}
                                  htmlType="submit"
                                  type="primary"
                                >
                                  {t('checkoutpage.checkout')}
                                </Button>
                              </Space>
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
      </>
    );
  }
}
export default WrapperRouter(WrapperTranslate(Summary));
