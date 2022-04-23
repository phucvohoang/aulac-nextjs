import React from 'react';
import { Row, Col, Card } from 'antd';
import useTranslation from 'next-translate/useTranslation';
const styleRow = { width: '100%', margin: '10px 0' };
const Account = ({ profile }) => {
  const { t } = useTranslation('common');
  const { name, email, customerPoint, phone } = profile;
  return (
    <div style={{ backgroundColor: 'rgb(242, 244, 236)' }}>
      <Card
        bordered={true}
        style={{ marginBottom: '20px' }}
        title={t('profilepage.membership')}
      >
        <Row style={styleRow} justify="space-between">
          <Col span={4}>{t('profilepage.memberPoint')}:</Col>
          <Col span={18}>
            {customerPoint} {t('profilepage.point')}
          </Col>
        </Row>
        <Row style={{ ...styleRow, marginTop: '20px' }} justify="space-between">
          <h3 style={{ color: 'red', fontStyle: 'italic' }}>
            {/* Cách thức tính điểm */}
            {t('profilepage.calculatePoint')}
          </h3>
          <Row style={styleRow} justify="space-between">
            <Col span={4}>{t('profilepage.convertOrderValue')}:</Col>
            <Col span={18}>10.000 đồng = 1 {t('profilepage.point')}</Col>
          </Row>
          <Row style={styleRow} justify="space-between">
            <Col span={4}>{t('profilepage.discount')}:</Col>
            <Col span={18}>1 {t('profilepage.point')} = 1.000 đồng</Col>
          </Row>
        </Row>
      </Card>
      <Card bordered={true} title={t('profilepage.accountInfor')}>
        <Row style={styleRow} justify="space-between">
          <Col span={4}>{t('profilepage.name')}:</Col>
          <Col span={18}>{name}</Col>
        </Row>
        <Row style={styleRow} justify="space-between">
          <Col span={4}>Email:</Col>
          <Col span={18}>{email}</Col>
        </Row>
        <Row style={styleRow} justify="space-between">
          <Col span={4}>{t('profilepage.phone')}:</Col>
          <Col span={18}>{phone}</Col>
        </Row>
      </Card>
    </div>
  );
};

export default Account;
