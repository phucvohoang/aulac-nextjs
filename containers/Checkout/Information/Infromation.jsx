import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import WrapperTranslate from '../../../components/WrapperTranslate/WrapperTranslate';
// import { withTranslation } from 'react-i18next';
class Information extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  handleFinish = (values) => {
    //console.log(values);
    this.props.fowardToNextStep(values);
  };
  render() {
    const user = this.props.currentUser;
    const { t } = this.props;
    return (
      <>
        <h3 className="heading">{t('checkoutpage.information')}</h3>
        <Form
          ref={this.formRef}
          onFinish={this.handleFinish}
          layout="horizontal"
          labelAlign="left"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            name: user?.name,
            phone: user?.phone,
            // email: user?.email,
          }}
        >
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label={t('checkoutpage.firstName')}
            name="name"
            className="checkout-form-list"
            // initialValue={currentUser?.info?.name}
          >
            {/*  */}
            <Input />
          </Form.Item>
          {/* <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Email"
            name="email"
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label={t('checkoutpage.phone')}
            name="phone"
            // initialValue={currentUser?.info?.name}
          >
            <Input />
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

export default WrapperTranslate(Information);
