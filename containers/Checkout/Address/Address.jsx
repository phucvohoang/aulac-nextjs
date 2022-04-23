import React from 'react';
import { Form, Row, Button, Radio, Select, Space, notification } from 'antd';
import {
  convertAdress,
  convertOldAddress,
  fetchingCityFromLatLng,
  isSameCity,
} from '../../../util/helper';
import { setItem } from '../../../util/localStorage';
import { ConfirmButton, SubmitGroup } from './styled';
import Map from '../../../components/HereMap';
import WrapperTranslate from '../../../components/WrapperTranslate/WrapperTranslate';
// import { withTranslation } from 'react-i18next';
const { Option } = Select;
class Address extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      typeAddress: 'old',
      shippingAddress: '',
      cityName: '',
      fullAddress: '',
      isProcessing: false,
      currentLocation: null,
    };
  }
  handleSelectTypAddressChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ typeAddress: value }));
  };
  handleSelectCity = (value) => {
    const cityId = value;
    const { cities } = this.props;
    const foundCity = cities?.find((item) => item._id === cityId);
    let cityName = foundCity ? foundCity?.name : '';
    this.props.getDistrictsLazy({
      variables: {
        cityId: cityId,
      },
    });
    this.setState(() => ({ city: cityId, cityName }));
  };
  handleSelectDistrict = (value) => {
    const districtId = value;
    this.props.getWardsLazy({
      variables: {
        districtId: districtId,
      },
    });
    this.setState(() => ({ district: districtId }));
  };
  handleSelectWard = (value) => {
    const wardId = value;
    this.setState(() => ({ ward: wardId }));
  };
  renderCitiesOption = () => {
    const { cities } = this.props;
    if (cities && cities.length > 0) {
      return cities.map((city, idx) => {
        return (
          <Option key={idx} value={city._id}>
            {city.name}
          </Option>
        );
      });
    }
  };
  renderDistricts = () => {
    const { districtList } = this.props;
    if (districtList && districtList.length > 0) {
      return districtList.map((district, idx) => {
        return (
          <Option key={idx} value={district._id}>
            {district.name}
          </Option>
        );
      });
    }
  };
  renderWards = () => {
    const { wardList } = this.props;
    if (wardList && wardList.length > 0) {
      return wardList.map((ward, idx) => {
        return (
          <Option key={idx} value={ward._id}>
            {ward.name}
          </Option>
        );
      });
    }
  };
  renderShippServices = () => {
    const { wardList } = this.props;
    if (wardList && wardList.length > 0) {
      return wardList.map((ward, idx) => {
        return (
          <Option key={idx} value={ward._id}>
            {ward.name}
          </Option>
        );
      });
    }
  };
  renderSavedAddress = () => {
    const { isLoggedIn, currentUser } = this.props;
    if (isLoggedIn) {
      const { info } = currentUser;
      if (currentUser.address.length > 0) {
        return currentUser.address.map((item, idx) => {
          const { addressNo } = item;
          return <Option key={idx} value={item._id}>{`${addressNo}`}</Option>;
        });
      }
    }
  };
  getCityFromOldAddress = (key) => {
    const { isLoggedIn, currentUser } = this.props;
    let cityName = '';
    let fullAddress = '';
    let foundAddress = null;
    //console.log(this.props);
    if (isLoggedIn && currentUser) {
      const { address } = currentUser;
      foundAddress = address.find((item) => item._id === key);
      fullAddress = foundAddress.addressNo;
      cityName = convertOldAddress(foundAddress);
    }
    return { cityName, fullAddress, foundAddress };
  };
  handleChooseSaveAddress = (value) => {
    const shippingAddress = value;
    this.setState(() => ({
      shippingAddress: shippingAddress,
    }));
  };
  handleFinish = async (values) => {
    const {
      typeAddress,
      shippingAddress,
      // cityName,
      // fullAddress,
      currentLocation,
    } = this.state;
    if (typeAddress === 'old') {
      const { fullAddress, foundAddress } =
        this.getCityFromOldAddress(shippingAddress);
      if (!foundAddress) {
        return notification.error({
          message: 'Lỗi',
          description: 'Địa chỉ không hợp lệ',
        });
      }
      const city = await fetchingCityFromLatLng(foundAddress);
      const isSame = isSameCity(city, this.props.region);
      if (isSame) {
        setItem('destinationShipping', { fullAddress, cityName: city });
        this.props.fowardToNextStep({ shippingAddress });
      } else {
        notification.error({
          message: 'Lỗi',
          description: 'Bạn đang chọn địa chỉ nhận hàng quá xa với Showroom',
        });
      }
    }
  };
  handleSaveNewAddress = () => {
    const { currentLocation } = this.state;
    const { fowardToNextStep, addAddressLocal, region } = this.props;
    this.setState(() => ({
      isProcessing: true,
    }));
    const { lat: latitude, lng: longitude, addressNo, city } = currentLocation;
    const isSame = isSameCity(city, region);
    if (!isSame) {
      this.setState(() => ({
        isProcessing: false,
      }));
      return notification.error({
        message: 'Lỗi',
        description: 'Bạn đang chọn địa chỉ nhận hàng quá xa với Showroom',
      });
    }
    this.props
      .addAddress({
        variables: {
          addressInput: {
            addressNo,
            latitude,
            longitude,
            isPrimary: true,
          },
        },
      })
      .then(async (res) => {
        //console.log('========== generate address completed =============');
        const { customerAddAddressV2: address } = res.data;
        // console.log(address);
        const shippingAddress = address._id;
        setItem('destinationShipping', {
          fullAddress: address.addressNo,
          cityName: city,
        });

        addAddressLocal(address);
        this.setState(() => ({
          isProcessing: false,
        }));
        notification.success({
          message: 'Tạo địa chỉ mới thành công',
        });
        fowardToNextStep({ shippingAddress });
      })
      .catch((e) => {
        //console.log('error when adding address');
        console.log(e);
        this.setState(() => ({
          isProcessing: false,
        }));
        notification.error({
          message: 'Lỗi',
          description: 'Không thể tạo địa chỉ mới',
        });
      });
  };
  handleChooseLocation = (location) => {
    this.setState(() => ({ currentLocation: location }));
  };
  render() {
    const user = this.props.currentUser;
    const { t } = this.props;
    return (
      <>
        <h3 className="heading">{t('checkoutpage.address')}</h3>
        <Row style={{ margin: '10px 0' }}>
          <Radio.Group
            value={this.state.typeAddress}
            onChange={this.handleSelectTypAddressChange}
          >
            <Radio value="old">{t('checkoutpage.savedAddress')}</Radio>
            <Radio value="new">{t('checkoutpage.newAddress')}</Radio>
          </Radio.Group>
        </Row>

        {this.state.typeAddress === 'old' ? (
          <Form
            ref={this.formRef}
            onFinish={this.handleFinish}
            layout="horizontal"
            labelAlign="left"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              typeAddress: this.state.typeAddress,
            }}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="shippingAddress"
              className="country-select"
              label={t('checkoutpage.chooseSavedAddress')}
              value={this.state.shippingAddress}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder={t('checkoutpage.chooseSavedAddress')}
                optionFilterProp="children"
                onChange={this.handleChooseSaveAddress}
                filterOption={(input, option) => {
                  // //console.log(option)
                  return (
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  );
                }}
              >
                {this.renderSavedAddress()}
              </Select>
            </Form.Item>
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
                  loading={this.state.isProcessing}
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
        ) : (
          <>
            <Map chooseLocation={this.handleChooseLocation} />
            <SubmitGroup>
              <Space size="large">
                <Button
                  onClick={this.props.backToLastStep}
                  htmlType="button"
                  type="ghost"
                >
                  {t('checkoutpage.back')}
                </Button>
                <Button
                  loading={this.state.isProcessing}
                  onClick={this.handleSaveNewAddress}
                  style={{
                    backgroundColor: 'goldenrod',
                    color: '#fff',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  {t('checkoutpage.next')}
                </Button>
              </Space>
            </SubmitGroup>
          </>
        )}
      </>
    );
  }
}

export default WrapperTranslate(Address);
