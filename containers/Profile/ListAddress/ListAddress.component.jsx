import React from 'react';
import { notification, Modal } from 'antd';
import Address from './Update-Create/Address.container';
import WrapperTranslate from '../../../components/WrapperTranslate/WrapperTranslate';
class ListAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentEdit: '',
    };
  }
  handleRemoveAddress = (id) => {
    this.props
      .remove({
        variables: {
          id,
        },
      })
      .then(() => {
        notification.success({
          message: 'Thành Công',
          description: 'Đã xóa thành công',
        });
      })
      .catch((e) => {
        notification.error({
          message: 'Thất Bại',
          description: 'Không thể xóa địa chỉ',
        });
      });
  };
  handleShowPopupEdit = (id) => {
    this.setState(() => ({ visible: true, currentEdit: id }));
  };
  handleClosePopupEdit = () => {
    this.setState(() => ({ visible: false, currentEdit: '' }));
  };
  renderTableContent = () => {
    const { address } = this.props.user;
    if (address.length > 0) {
      return address.map((item, idx) => {
        // //console.log(item)
        const { addressNo, _id } = item;
        return (
          <tr key={idx}>
            <td className="table-p-name" style={{ textTransform: 'lowercase' }}>
              <p>{this.props.user.email}</p>
            </td>
            <td className="table-p-name">
              <p>{this.props.user.name}</p>
            </td>
            <td className="table-p-name">
              <p>{`${addressNo}`}</p>
            </td>
            <td className="table-remove">
              <button
                onClick={() => {
                  this.handleRemoveAddress(_id);
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
              <button
                style={{ marginLeft: '20px' }}
                onClick={() => {
                  this.handleShowPopupEdit(_id);
                }}
              >
                <i className="fa fa-edit"></i>
              </button>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan={4}>{this.props.t('profilepage.empty')}</td>
        </tr>
      );
    }
  };
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        {this.state.visible && (
          <Address
            handleClosePopupEdit={this.handleClosePopupEdit}
            id={this.state.currentEdit}
          />
        )}
        <div className="table-responsive">
          <table className="table product-table text-center">
            <thead>
              <tr>
                <th className="table-p-name">Email</th>
                <th className="table-p-name">{t('profilepage.name')}</th>
                <th className="table-p-price">{t('profilepage.address')}</th>
                <th className="table-p-price">Actions</th>
              </tr>
            </thead>
            <tbody>{this.renderTableContent()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default WrapperTranslate(ListAddress);
