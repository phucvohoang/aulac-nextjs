import React from 'react';
import { withRouter } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import ListOrder from './ListOrders/ListOrder.container';
import ListCoupon from './ListCoupons/ListCoupon.container';
import ListAddress from './ListAddress/ListAddress.container';
import WishList from './WishList/Wishlist.container';
import UpdateProfile from './UpdateProfile/UpdateProfile.container';
import Account from './Account/Account.container';
import WrapperTranslate from '../../components/WrapperTranslate/WrapperTranslate.js';
import WrapperRouter from '../../components/WrapperRouter/WrapperRouter.js';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'account',
    };
  }

  componentDidMount() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('tab')) {
      const tab = urlParams.get('tab');
      const acceptedTab = [
        'account',
        'orders',
        'updateProfile',
        'coupons',
        'address',
        'wishlist',
      ];
      const isInAcceptTabs = acceptedTab.find((item) => item === tab);
      if (isInAcceptTabs) {
        this.setState(() => ({ currentTab: tab }));
      } else {
        this.setState(() => ({ currentTab: 'account' }));
      }
    }
  }

  renderTabs = () => {
    const { currentTab } = this.state;
    switch (currentTab) {
      case 'account':
        return <Account />;
      case 'orders':
        return <ListOrder {...this.props} />;
      case 'updateProfile':
        return <UpdateProfile user={this.props.user} />;
      case 'coupons':
        return <ListCoupon />;
      case 'address':
        return <ListAddress user={this.props.user} />;
      case 'wishlist':
        return <WishList />;
      default:
        return <UpdateProfile />;
    }
  };
  handleChangeTab = (tab) => {
    // setItem('currentProfileTab')
    // console.log(this.props)
    this.props.router.push(`/profile?tab=${tab}`);
    this.setState(() => ({ currentTab: tab }));
  };
  render() {
    const { t } = this.props;
    return (
      <div className="profile__container">
        <div className="profile__header">
          {/* <ProductsHeader /> */}
          <SectionHeader title={t('profilepage.manageAccount')} />
        </div>
        <div className="profile">
          <div className="profile__category">
            <div className="profile__category__container">
              <div className="profile__category__header">
                <h2>{t('profilepage.manageAccount')}</h2>
              </div>
              <div className="profile__category__body">
                <ul className="profile__category__list">
                  <li
                    onClick={() => {
                      this.handleChangeTab('account');
                    }}
                    className="profile__category__item"
                  >
                    <p
                      className={
                        this.state.currentTab === 'account' ? 'active' : ''
                      }
                    >
                      {t('profilepage.account')}
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      this.handleChangeTab('updateProfile');
                    }}
                    className="profile__category__item"
                  >
                    <p
                      className={
                        this.state.currentTab === 'updateProfile'
                          ? 'active'
                          : ''
                      }
                    >
                      {t('profilepage.updateAccount')}
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      this.handleChangeTab('orders');
                    }}
                    className="profile__category__item"
                  >
                    <p
                      className={
                        this.state.currentTab === 'orders' ? 'active' : ''
                      }
                    >
                      {/* Đơn Hàng */}
                      {t('profilepage.order')}
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      this.handleChangeTab('wishlist');
                    }}
                    className="profile__category__item"
                  >
                    <p
                      className={
                        this.state.currentTab === 'wishlist' ? 'active' : ''
                      }
                    >
                      {t('profilepage.favourite')}
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      this.handleChangeTab('coupons');
                    }}
                    className="profile__category__item"
                  >
                    <p
                      className={
                        this.state.currentTab === 'coupons' ? 'active' : ''
                      }
                    >
                      {t('profilepage.coupon')}
                    </p>
                  </li>
                  <li
                    onClick={() => {
                      this.handleChangeTab('address');
                    }}
                    className="profile__category__item"
                  >
                    <p
                      className={
                        this.state.currentTab === 'address' ? 'active' : ''
                      }
                    >
                      {t('profilepage.savedAddress')}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="profile__content">
            {/* <ProductsList categoryID={categoryID} /> */}
            {/* <Article />  */}
            {this.renderTabs()}
          </div>
        </div>
      </div>
    );
  }
}

export default WrapperTranslate(WrapperRouter(Profile));
