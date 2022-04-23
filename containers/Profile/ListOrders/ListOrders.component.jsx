import React from 'react';
import { addCommas } from '../../../util/helper';
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
import Link from 'next/link';
import FeatherIcon from 'feather-icons-react';
import WrapperTranslate from '../../../components/WrapperTranslate/WrapperTranslate';
const { Option } = Select;
class ListOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'draft',
      currentPage: 1,
      visible: false,
      currentOrder: null,
      confirmLoading: false,
    };
    this.columns = [
      {
        title: props.t('profilepage.orderCode'),
        dataIndex: 'orderCode',
        key: 'orderCode',
      },
      // {
      //   title: 'Sản Phẩm',
      //   dataIndex: 'products',
      //   key: 'products',
      // },
      {
        title: props.t('profilepage.address'),
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: props.t('profilepage.total'),
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const { _id } = record;
          // //console.log(_id);
          return (
            <Space>
              <Link
                href={`/order/${_id}`}
                target="_blannk"
                // onClick={() => {
                //   this.props.history.push(`/order/${_id}`);
                // }}
              >
                <Button>
                  <FeatherIcon size={12} icon="eye" />
                </Button>
              </Link>
              {this.state.status === 'ordered' && (
                <Button
                  onClick={() => {
                    this.setState(() => ({
                      currentOrder: record,
                      visible: true,
                    }));
                  }}
                >
                  <FeatherIcon size={12} icon="trash" />
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  }
  componentDidMount() {
    // //console.log('Calling did mount list order')
    this.props.getOrders({
      variables: {
        shippingStatus: [this.state.status],
      },
    });
  }
  renderDetailsItem = (order) => {
    const { details } = order;
    return details.map((item, idx) => {
      return (
        <li key={idx}>
          <div className="order__product--item">
            <div className="order__product--item--name">
              <p>{item.product.name}</p>
            </div>
            <div className="order__product--item--quantity">
              {/* <span style={{ margin: '0 1rem', fontWeight: 'bold' }}>x</span>
              <span>{item.quantity}</span> */}
              <p style={{ textAlign: 'left' }}>
                <strong>Số lượng: </strong>
                {item.quantity}
              </p>
            </div>
          </div>
        </li>
      );
    });
  };

  renderAddressHelper = (shippingAddress) => {
    if (shippingAddress) {
      const { addressNo, district, city, ward } = shippingAddress;
      return `${addressNo}`;
    }
    return 'Missing';
  };
  renderTableContent = () => {
    const listOrders = this.props.listOrders;
    if (listOrders?.docs?.length > 0) {
      const { docs } = listOrders;
      // //console.log(docs)
      if (docs.length > 0) {
        const res = docs.map((order, idx) => {
          // //console.log(order)
          const {
            _id,
            orderCode,
            // totalAmount,
            shippingAddress,
            totalAmountFinal,
            // totalAmountIncludesVAT,
          } = order;

          return {
            _id,
            orderCode,
            // products: (
            //   <ul className="list__item--table">
            //     {this.renderDetailsItem(order)}
            //   </ul>
            // ),
            address: <p>{this.renderAddressHelper(shippingAddress)}</p>,
            total: <p>{addCommas(totalAmountFinal)}đ</p>,
          };
          // return (
          //   <tr key={idx}>
          //     <td className="table-remove">
          //       <p>{orderCode}</p>
          //     </td>

          //     <td className="table-p-name">
          //       <ul>{this.renderDetailsItem(order)}</ul>
          //     </td>
          //     <td className="table-p-name">
          //       <p>
          //         {`${addressNo}/${ward.name}/${district.name}/${city.name}`}
          //       </p>
          //     </td>

          //     <td className="table-total">
          //       <p>{addCommas(totalAmountFinal)}đ</p>
          //     </td>
          //   </tr>
          // );
        });

        //console.log(res);
        return res;
      } else {
        return (
          <tr>
            <td colSpan={4}>Chưa có sản phẩm</td>
          </tr>
        );
      }
    } else {
      return [];
    }
  };
  onChangePage = (numberpage) => {
    this.props.getOrders({
      variables: {
        page: numberpage,
        perPage: 10,
        shippingStatus: [this.state.status],
      },
    });
    this.setState(() => ({ currentPage: numberpage }));
  };
  onChange = (value) => {
    this.props.getOrders({
      variables: {
        shippingStatus: [value],
        page: 1,
        perPage: 10,
      },
    });
    this.setState(() => ({ currentPage: 1, status: value }));
  };

  handleOk = () => {
    const { currentOrder } = this.state;
    this.setState(() => ({ confirmLoading: true }));
    this.props
      .cancelOrder({
        variables: {
          id: currentOrder?._id,
        },
      })
      .then((res) => {
        //console.log(res);
        this.props.getOrders({
          variables: {
            shippingStatus: [this.state.status],
          },
        });
        notification.success({
          message: 'Thành Công',
          description: `Bạn đã huỷ đơn hàng ${currentOrder.orderCode} thành công`,
        });
        this.setState(() => ({
          confirmLoading: false,
          currentOrder: null,
          visible: false,
        }));
      })
      .catch((e) => {
        notification.error({
          message: 'Lỗi',
          description: `Bạn không thể huỷ đơn hàng ${currentOrder.orderCode}`,
        });
        this.setState(() => ({
          confirmLoading: false,
          currentOrder: null,
          visible: false,
        }));
      });
  };
  handleCancel = () => {
    this.setState(() => ({ currentOrder: null, visible: false }));
  };
  render() {
    const { visible, currentOrder, confirmLoading } = this.state;
    const { t } = this.props;
    return (
      <React.Fragment>
        <Modal
          title={t('profilepage.cancelOrder')}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={t('profilepage.cancelOrder')}
          cancelText={t('profilepage.cancel')}
          visible={visible}
          // confirmLoading={confirmLoading}
        >
          <p>
            {t('profilepage.cancelWarning')}: {currentOrder?.orderCode}
          </p>
        </Modal>
        <Row
          style={{ margin: '10px', padding: '20px 0px' }}
          justify="space-between"
        >
          <Col span={6}>
            <p style={{ fontWeight: 'bold' }}>
              {t('profilepage.orderStatus')}:{' '}
            </p>
          </Col>
          <Col span={5}>
            <Select
              showSearch
              style={{ width: 180 }}
              placeholder="Select Status"
              optionFilterProp="children"
              onChange={this.onChange}
              // onFocus={onFocus}
              // onBlur={onBlur}
              // onSearch={onSearch}
              value={this.state.status}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="draft">{t('profilepage.draft')}</Option>
              <Option value="ordered">{t('profilepage.ordered')}</Option>
              <Option value="packed">{t('profilepage.packed')}</Option>
              <Option value="shipped">{t('profilepage.shipped')}</Option>
              <Option value="delivered">{t('profilepage.delivered')}</Option>
            </Select>
          </Col>
          <Col span={10}>
            <Row justify="end">
              <Pagination
                current={this.state.currentPage}
                onChange={this.onChangePage}
                total={
                  this.props.listOrders.totalDocs
                    ? this.props.listOrders.totalDocs
                    : 0
                }
                pageSize={10}
                showSizeChanger={false}
              />
            </Row>
          </Col>
        </Row>
        <Row style={{ width: '100%' }}>
          <Table
            style={{ width: '100%' }}
            dataSource={this.renderTableContent()}
            columns={this.columns}
            pagination={false}
            rowKey={(record) => record._id}
          />
        </Row>
      </React.Fragment>
    );
  }
}

export default WrapperTranslate(ListOrder);
