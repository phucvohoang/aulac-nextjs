import React from 'react';
import { Form, Button, Space, Select, Input, notification } from 'antd';
import Map from '../../../../components/HereMap';
import { Container, Content, Controll } from './styled';
import WrapperTranslate from '../../../../components/WrapperTranslate/WrapperTranslate';
const { Option } = Select;
class Address extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      addressNo: '',
      city: '',
      district: '',
      ward: '',
      currentLocation: null,
      isProcessing: false,
    };
  }
  componentDidMount() {
    this.props.getCitiesLazy();
  }
  handleSelectCity = (value) => {
    // console.log(e.target.value);
    const cityId = value;

    this.props.getDistrictsLazy({
      variables: {
        cityId: cityId,
      },
    });
    this.setState(() => ({ city: cityId }));
  };
  handleSelectDistrict = (value) => {
    // console.log(e.target.value);
    const districtId = value;
    this.props.getWardsLazy({
      variables: {
        districtId: districtId,
      },
    });
    this.setState(() => ({ district: districtId }));
    //this.props.getDistrict(cityId)
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
    // const { }
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
    // const { }
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
  handleUpdate = () => {
    // console.log(values)
    const { id, updateAddress } = this.props;
    const { currentLocation } = this.state;
    if (currentLocation && id) {
      const { addressNo, lat, lng } = currentLocation;
      this.setState(() => ({ isProcessing: true }));
      const payload = {
        addressNo,
        latitude: lat,
        longitude: lng,
        isPrimary: false,
      };
      updateAddress({
        variables: {
          id,
          addressInput: payload,
        },
      })
        .then(() => {
          // console.log('update success');
          this.setState(() => ({ isProcessing: false }));
          this.props.handleClosePopupEdit();
          notification.success({
            message: 'Thành Công',
            description: 'Đã cập nhật địa chỉ thành công',
          });
        })
        .catch((e) => {
          this.setState(() => ({ isProcessing: false }));
          notification.error({
            message: 'Thất Bại',
            description: 'Cập nhật thất bại',
          });
        });
    }
  };
  handleChooseLocation = (location) => {
    this.setState(() => ({ currentLocation: location }));
  };
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Content
            className="modal__wrapper--content"
            style={{ width: '60%', height: 'auto' }}
          >
            <Map
              chooseLocation={this.handleChooseLocation}
              textResult={`${t('profilepage.newAddress')}: `}
            />
            <Controll>
              <Space size="large">
                <Button
                  onClick={this.props.handleClosePopupEdit}
                  htmlType="button"
                  type="ghost"
                >
                  {t('profilepage.cancel')}
                </Button>
                <Button
                  loading={this.state.isProcessing}
                  style={{
                    backgroundColor: 'goldenrod',
                    color: '#fff',
                    border: 'none',
                    outline: 'none',
                  }}
                  disabled={!this.state.currentLocation}
                  type="primary"
                  onClick={this.handleUpdate}
                >
                  {t('profilepage.update')}
                </Button>
              </Space>
            </Controll>
          </Content>
        </Container>
      </React.Fragment>
    );
  }
}
export default WrapperTranslate(Address);

/*

<Form ref={this.formRef}  onFinish={this.handleFinish} style={{width: '100%', padding: '20px'}}>
                
                <Row>
                    <Col span={24}>
                        <label>Địa chỉ <span className="required">*</span></label>
                        <Form.Item
                            style={{width: '100%'}} 
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            name="addressNo" 
                            className="checkout-form-list">
                            {/* <label>Địa chỉ <span className="required">*</span></label> 
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-lg-12">
                        <label>Thành Phố <span className="required">*</span></label>
                        <Form.Item
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            name="city"
                            className="country-select">
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Chọn Thành Phố"
                                optionFilterProp="children"
                                onChange={this.handleSelectCity}
                                filterOption={(input, option) =>{
                                    // console.log(option)
                                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                    
                                }
                            >
                                {this.renderCitiesOption()}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="half__row">
                    <div className="col-lg-12">
                        <label>Quận/Huyện <span className="required">*</span></label>	
                        <Form.Item
                            rules={[
                                {
                                  required: true,
                                },
                              ]}
                            name="district"
                            className="country-select">
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Chọn Quận/Huyện"
                                optionFilterProp="children"
                                onChange={this.handleSelectDistrict}
                                filterOption={(input, option) =>{
                                    // console.log(option)
                                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                }
                            >
                                {this.renderDistricts()}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-lg-12">
                        <label>Phường/xã<span className="required">*</span></label>	
                        <Form.Item
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            name="ward"
                            className="country-select">
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Chọn Phường/xã"
                                optionFilterProp="children"
                                onChange={this.handleSelectWard}
                                filterOption={(input, option) =>{
                                    // console.log(option)
                                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                    
                                }
                            >
                                {this.renderWards()}
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập Nhật
                        </Button>
                    </Form.Item>
                </div>
                </Form>
*/
