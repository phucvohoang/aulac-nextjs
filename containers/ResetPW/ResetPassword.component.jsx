import React from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import { Row, Form, Input, Button, notification, Col } from 'antd';

const ResetPW = (props) => {
  const { resetPw, accessToken } = props;
  console.log(accessToken);
  // const url = '';
  const onFinish = async (values) => {
    console.log('Success--2:', values);
    const { password, confirmPassword, email } = values;
    if (password === confirmPassword) {
      try {
        console.log({
          email: email.toLowerCase(),
          newPassword: password.toLowerCase(),
          token: accessToken,
        });
        const response = await resetPw({
          variables: {
            email: email.toLowerCase(),
            newPassword: password.toLowerCase(),
            token: accessToken,
          },
        });
        console.log('Payload for sending...')
        console.log({
          email: email.toLowerCase(),
          newPassword: password.toLowerCase(),
          token: accessToken,
        })
        console.log(response);
        const { message, success } = response.data
        if (success) {
          notification.success({
            message: 'Thành Công',
            description: message,
          });
        } else {
          notification.error({
            message: 'Lỗi',
            description: message,
          });
        }
      } catch (e) {
        console.log('im in catch clause')
        console.log(e);
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
        <SectionHeader title="Reset Password" />
      </div>
      <Col style={{ padding: '20px 10px', backgroundColor: '#fff' }}>
        <Row justify="center" align="middle">
          <h2>Reset Password</h2>
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
                message: 'Please input your email!',
              },
            ]}
          >
            <Input style={{ outline: 'none' }} />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password style={{ outline: 'none' }} />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
            ]}
          >
            <Input.Password style={{ outline: 'none' }} />
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
