import React from 'react';
import {
  Form,
  Input,
  Button,
  Switch,
  Select,
  Space,
  Row,
  Col,
  notification,
} from 'antd';
import { getItem } from '../../../util/localStorage';
import { convertCartToRequestBody } from '../../../util/helper';
import WrapperTranslate from '../../../components/WrapperTranslate/WrapperTranslate';
// import { withTranslation } from 'react-i18next';
const { Option } = Select;
class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequiredVatInvoice: false,
      isShippedToHNOrHCM: this.checkAllowShippedByBe(),
      deliveryService: this.checkAllowShippedByBe() ? 'aulac' : 'be',
      couponChange: '',
      coupon: {
        errorMsg: '',
        discountCode: '',
        status: '',
      },
    };
  }

  checkAllowShippedByBe = (isRegion = false) => {
    const shipToCity = getItem('destinationShipping')?.cityName;
    let acceptShippedByBee = ['hà nội', 'hồ chí minh'];
    if (isRegion) {
      //console.log('===== In IF case of checkAllowShippedByBe =========');
      const regionName = this.props?.region?.name?.toLowerCase() ?? '';
      return acceptShippedByBee.includes(regionName);
    } else {
      if (shipToCity) {
        //console.log('===== In Else case of checkAllowShippedByBe =========');
        return acceptShippedByBee.includes(shipToCity.toLowerCase());
      }
    }

    return false;
  };

  componentDidMount() {}

  handleRequireVat = (checked) => {
    this.setState(() => ({ isRequiredVatInvoice: checked }));
  };
  handleSelectshippedBy = (value) => {
    // const { name, value, checked } = e.target;
    // //console.log(name, value, checked)
    //if(name === '')
    this.setState(() => ({
      deliveryService: value,
    }));
  };
  renderListCoupons = () => {
    const listCoupon = this.props.listCoupon;
    if (listCoupon.length > 0) {
    }
  };
  handleFinish = (values) => {
    const { deliveryService } = this.state;
    const { coupon } = this.props;
    const region = JSON.parse(localStorage.getItem('region'));
    const details = convertCartToRequestBody(this.props.cartItems);
    const saleRegion = region?._id;
    if (coupon.status === 'success' && coupon.discountCode) {
      //console.log('============ In if ==============');
      values.discountCode = coupon.discountCode;
    }
    // if()
    //console.log({ ...values, deliveryService, saleRegion, details });
    this.props.fowardToNextStep({
      ...values,
      deliveryService,
      saleRegion,
      details,
      discountCode:
        coupon?.status === 'success' && coupon?.discountCode
          ? coupon?.discountCode
          : '',
    });
    // //console.log(values);
  };
  handleCouponChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ couponChange: value }));
  };
  callbackCheckCoupon = (payload) => {
    //console.log(payload);
    if (!payload) {
      return;
    }
    if (payload.status === 'success') {
      this.setState(() => ({
        coupon: {
          discountCode: payload.discountCode,
          status: 'success',
          errorMsg: 'Đã thêm coupon thành công',
        },
      }));
    } else {
      this.setState(() => ({
        coupon: {
          discountCode: '',
          status: 'error',
          errorMsg: 'Coupon không hợp lệ',
        },
      }));
    }
  };
  handleCheckCoupon = () => {
    const { couponChange } = this.state;
    const details = convertCartToRequestBody(this.props.cartItems);
    const region = JSON.parse(localStorage.getItem('region'));
    const regionID = region?._id;
    if (!couponChange.trim() && details.length === 0 && regionID) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể kiểm tra coupon',
      });
      return;
    }
    const payload = {
      details,
      discountCode: couponChange.trim(),
      saleRegion: regionID,
    };

    this.props.preCalculatePromo(payload, this.callbackCheckCoupon);
  };
  render() {
    //console.log(this.props.region);
    const isRegionCorrect = this.checkAllowShippedByBe(true);
    const user = this.props.currentUser?.info;
    const { isRequiredVatInvoice, couponChange } = this.state;
    const { coupon, t } = this.props;
    return (
      <>
        <h3 className="heading">{t('checkoutpage.other')}</h3>
        <Form
          ref={this.formRef}
          onFinish={this.handleFinish}
          layout="horizontal"
          labelAlign="left"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            name: user?.name,
            phone: user?.phone,
            email: user?.email,
          }}
        >
          <Form.Item
            label={t('checkoutpage.coupon')}
            // hasFeedback={coupon.status ? true : false}
            validateStatus={coupon.status ? coupon.status : ''}
            // help={coupon.completeMsg ? coupon.completeMsg : ''}
            initialValue={this.props.coupon.discountCode}
            help={
              <label
                style={{ color: coupon.status === 'success' ? 'green' : 'red' }}
              >
                {coupon.completeMsg ? coupon.completeMsg : ''}
              </label>
            }
          >
            <Row gutter={[15, 15]} justify="space-between">
              <Col xs={24} span={18}>
                <Input
                  placeholder={t('checkoutpage.coupon')}
                  id="error"
                  // style={{ display: 'inline-block' }}
                  value={couponChange}
                  onChange={this.handleCouponChange}
                />
              </Col>
              <Col span={4}>
                <Button onClick={this.handleCheckCoupon} htmlType="button">
                  {/* Sử dụng coupon */}
                  {t('checkoutpage.useCoupon')}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            shouldUpdate
            name="deliveryService"
            className="country-select"
            label={t('checkoutpage.deliveryServices')}
            // initialValue={this.state.deliveryService}
            help={t('checkoutpage.deliveryServicesWarn')}
          >
            <Select
              showSearch
              loading={!this.props.region}
              style={{ width: '100%' }}
              placeholder={t('checkoutpage.deliveryServices')}
              optionFilterProp="children"
              onChange={this.handleSelectshippedBy}
              filterOption={(input, option) => {
                // //console.log(option)
                return (
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                );
              }}
            >
              {/* {this.renderCitiesOption()}
                          {/* <Option value="">Chọn Đơn Vị Giao Hàng</Option>*/}
              {/* <Option value="aulac">Âu Lạc</Option> */}
              {this.state.isShippedToHNOrHCM && isRegionCorrect && (
                <Option value="be">Be</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item name="note" label={t('checkoutpage.note')}>
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: false,
              },
            ]}
            name="isRequiredVatInvoice"
            label={t('checkoutpage.vat')}
          >
            <Switch
              onChange={this.handleRequireVat}
              checked={this.state.isRequiredVatInvoice}
            />
          </Form.Item>

          {/* =========== VAT Section ============ */}
          {isRequiredVatInvoice && (
            <>
              <Form.Item
                rules={[
                  {
                    required: isRequiredVatInvoice,
                  },
                ]}
                name="vatInvoiceCompanyName"
                label={t('checkoutpage.companyName')}
              >
                <Input />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: isRequiredVatInvoice,
                  },
                ]}
                name="vatInvoiceCompanyAddress"
                label={t('checkoutpage.companyAddress')}
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: isRequiredVatInvoice,
                  },
                ]}
                name="vatInvoiceCompanyTaxCode"
                label={t('checkoutpage.taxNumber')}
              >
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
            <Space size="large">
              <Button
                onClick={this.props.backToLastStep}
                htmlType="button"
                type="ghost"
              >
                {t('checkoutpage.back')}
              </Button>
              <Button
                // loading={true}
                style={{
                  backgroundColor: 'goldenrod',
                  color: '#fff',
                  border: 'none',
                  outline: 'none',
                }}
                htmlType="submit"
                type="primary"
              >
                {t('checkoutpage.next')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default WrapperTranslate(Pay);
