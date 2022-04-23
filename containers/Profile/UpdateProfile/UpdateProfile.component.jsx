import React from 'react';
import { Form, Input, Card, Button, message, Upload } from 'antd';
import FeatherIcon from 'feather-icons-react';
import useTranslation from 'next-translate/useTranslation';
const UpdateProfile = (props) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { t } = useTranslation('common');
  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    // console.log(file);
    // console.log(file instanceof File)
    props.updateAvatar({
      variables: {
        file,
      },
    });
  };
  const propsUpload = {
    name: 'file',
    showUploadList: false,
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },

    customRequest: ({ onSuccess, onError, file }) => {},
    onChange: handleUpload,
  };

  const onReset = () => {
    form.resetFields();
  };
  const onReset2 = () => {
    form2.resetFields();
  };

  const handleSubmitInfo = (values) => {
    // console.log(values);
    const { name, phone } = values;
    props.updateProfile({
      variables: {
        customerUpdateProfileInput: {
          name,
          phone,
        },
      },
    });
  };
  const handleSubmitPassword = (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    if (newPassword === confirmPassword) {
      props.updatePassword({
        variables: {
          oldPassword,
          newPassword,
        },
      });
    }
  };
  const style = {
    backgroundColor: 'goldenrod',
    color: '#fff',
    border: 'none',
    outline: 'none',
  };
  return (
    <div style={{ backgroundColor: '#f2f4ec' }}>
      <Card title={t('profilepage.updateProfile')}>
        <Form
          initialValues={{
            name: props.user?.name,
            phone: props.user?.phone,
          }}
          form={form}
          layout="vertical"
          onFinish={handleSubmitInfo}
        >
          <Form.Item
            name="name"
            label={t('profilepage.name')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t('profilepage.phone')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              loading={props.updatingProfile}
              type="primary"
              htmlType="submit"
              style={style}
            >
              {t('profilepage.update')}
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              style={{ marginLeft: '10px' }}
            >
              {t('profilepage.cancel')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        bordered={true}
        title="Upload Avatar"
        style={{ margin: '20px 0 0' }}
      >
        <Upload {...propsUpload}>
          <Button
            loading={props.updatingAvatar}
            icon={<FeatherIcon icon="upload" size={16} />}
          >
            Click to Upload
          </Button>
        </Upload>
      </Card>
      <Card
        title={t('profilepage.updatePassword')}
        style={{ margin: '20px 0 0' }}
      >
        <Form form={form2} layout="vertical" onFinish={handleSubmitPassword}>
          <Form.Item
            name="oldPassword"
            label={t('profilepage.oldPassword')}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label={t('profilepage.newPassword')}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={t('profilepage.confirmNewPassword')}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              loading={props.updatingPassword}
              type="primary"
              htmlType="submit"
              style={style}
            >
              {t('profilepage.update')}
            </Button>
            <Button
              htmlType="button"
              onClick={onReset2}
              style={{ marginLeft: '10px' }}
            >
              {t('profilepage.cancel')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateProfile;
