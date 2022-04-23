import React from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import { Row, Form, Input, Button, notification, Col } from 'antd';

const ResetPW = (props) => {
  const { forgetPW } = props;
  // console.log(accessToken);
  // const url = '';
  const onFinish = async (values) => {
    console.log('Success:', values);
    const { email } = values;
    if (email) {
      try {
        const data = await forgetPW({
          variables: {
            email,
          },
        });
        console.log(data);
        notification.success({
          message: 'Success',
          description: 'Please check your email',
        });
      } catch (e) {
        console.log(e)
        notification.error({
          message: 'Fail',
          description: 'Update password failure',
        });
      }
    } else {
      notification.error({
        message: 'Fail',
        description: 'Password and Confirm Password are not same',
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notification.error({
      message: 'Fail',
      description: 'Something went wrong',
    });
  };

  const styleBtn = {
    backgroundColor: 'goldenrod',
    border: 'goldenrod',
  };

  return (
    <Col justify="center" align="middle">
      <div className="products__header">
        <SectionHeader title="Forget Password" />
      </div>
      <Col style={{ padding: '20px 10px', backgroundColor: '#fff' }}>
        <Row justify="center" align="middle">
          <h2>Forget Password</h2>
        </Row>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Row justify="start">
              <Button
                style={styleBtn}
                type="primary"
                htmlType="submit"
                size="medium"
              >
                Submit
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Col>
  );
};

export default ResetPW;
