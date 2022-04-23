import React from 'react';
import {
  Select,
  Row,
  Col,
  Pagination,
  Button,
  Table,
  Space,
  Modal,
  notification,
} from 'antd';
import moment from 'moment';
import { addCommas } from '../../../util/helper';
import WrapperTranslate from '../../../components/WrapperTranslate/WrapperTranslate';
class ListCoupon extends React.Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.columns = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: t('profilepage.value'),
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: t('profilepage.status'),
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: t('couponInformation'),
        dataIndex: 'information',
        key: 'information',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '100px',
        render: (text, record) => {
          // //console.log(_id);
          return (
            <Space>
              <Button
                onClick={() => {
                  this.handleCopytoClipboard(record);
                }}
              >
                Copy Coupon
              </Button>
            </Space>
          );
        },
      },
    ];
  }
  handleCopytoClipboard = (data) => {
    const { code } = data;
    const { t } = this.props;
    console.log(`Code: ${code}`);
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          notification.success({
            message: `Copy ${t('success')}`,
          });
        })
        .catch((e) => {
          notification.error({
            message: `Copy ${t('fail')}`,
          });
        });
    } else {
    }
  };
  renderDetailsItem = (order) => {
    const { details } = order;
    return details.map((item, idx) => {
      return (
        <li key={idx}>
          <span>{item.product.name}</span>
          <span style={{ margin: '0 1rem', fontWeight: 'bold' }}>x</span>
          <span>{item.quantity}</span>
        </li>
      );
    });
  };
  renderTableContent = () => {
    const listCoupon = this.props.listCoupon ?? [];
    const { t } = this.props;
    console.log(`Is in if: ${listCoupon.length}`);
    console.log(listCoupon);
    if (listCoupon.length > 0) {
      return listCoupon.map((coupon, idx) => {
        const {
          code,
          discountType,
          discountValue,
          isActive,
          endDate,
          remainingCount,
          applyToOrderTotalAmount,
        } = coupon;
        console.log(endDate);
        const style = isActive
          ? { color: 'green' }
          : { color: '#000', fontStyle: 'italic' };

        return {
          code,
          value: `${discountValue}${discountType === 'fixed' ? 'đ' : '%'}`,
          status: (
            <p style={style}>
              {isActive ? t('couponActive') : t('couponDisabled')}
            </p>
          ),
          information: (
            <div>
              <Row>
                <Space size="middle">
                  <strong>{t('couponDate')}: </strong>
                  {endDate
                    ? moment(endDate).format('DD-MM-YYYY')
                    : t('forever')}
                </Space>
              </Row>
              <Row>
                <Space size="middle">
                  <strong>{t('couponNumberOfUse')}: </strong> {remainingCount}
                </Space>
              </Row>
              {applyToOrderTotalAmount && (
                <Row>
                  <Space size="small">
                    <strong>{t('couponStartAtPrice')}: </strong>{' '}
                    {addCommas(applyToOrderTotalAmount)}
                  </Space>
                </Row>
              )}
            </div>
          ),
        };
      });
    } else {
      // return (
      //   <tr>
      //     <td colSpan={3}>{this.props.t('profilepage.empty')}</td>
      //   </tr>
      // );
    }
  };
  render() {
    const dataSource = this.renderTableContent();
    return (
      <React.Fragment>
        <Row style={{ width: '100%' }}>
          <Table
            style={{ width: '100%' }}
            dataSource={dataSource}
            columns={this.columns}
            pagination={false}
            rowKey={(record) => record?._id}
          />
        </Row>
        {/* <div className="table-responsive">
          <table className="table product-table text-center">
            <thead>
              <tr>
                <th className="table-p-name">Code</th>
                <th className="table-p-price">{t('profilepage.value')}</th>
                <th className="table-total">{t('profilepage.status')}</th>
              </tr>
            </thead>
            <tbody>{this.renderTableContent()}</tbody>
          </table>
        </div> */}
      </React.Fragment>
    );
  }
}

export default WrapperTranslate(ListCoupon);
