import React from 'react';
//import {ReactComponent as Logo} from '../../assets/footer/logo.svg'
// import { Link, NavLink, withRouter } from 'react-router-dom';
import { Link, NavLink, withRouter } from 'next/link';
import LoginRegister from '../LoginRegister/LoginRegister.container.jsx';
import { addCommas, mapCategory } from '../../util/helper';
import { Form, Input, Collapse, Space, Popover } from 'antd';
import logo from '../../assets/logo-2x.png';
import HeaderMobile from './Header-Mobile';
import FeatherIcon from 'feather-icons-react';
import withTranslation from 'next-translate/withTranslation';
import bgHeader from '../../assets/banners/header@2x.png';
const { Panel } = Collapse;
// const logo = "https://aulacshop.com/assets/img/logo.png"
class Header extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      // form: Form.useForm()
    };
  }

  getTotalQuantityAndPrice = () => {
    const { cartItems } = this.props;
    const cart = Object.keys(cartItems);
    if (cart.length > 0) {
      return cart.reduce((accum, current) => {
        return (accum =
          accum + cartItems[current].salePrice * cartItems[current].quantity);
      }, 0);
    }
    return 0;
  };

  renderProductCheckout = () => {
    const { cartItems } = this.props;
    let cart = Object.keys(cartItems);

    return (
      cart.length > 0 &&
      cart.map((key) => {
        return (
          <div key={key} className="cart__checkout__info">
            <div className="cart__product--name">
              <h4>{cartItems[key].name}</h4>
            </div>
            <div
              onClick={() => {
                this.props.remove(cartItems[key]);
              }}
              className="cart__product--quantity"
            >
              <span>
                <i className="fas fa-times" />
                &nbsp;{cartItems[key].quantity}
              </span>
            </div>
            <div className="cart__product--price">
              <span>{addCommas(cartItems[key].salePrice)}đ</span>
            </div>
          </div>
        );
      })
    );
  };
  renderSaleRegions = () => {
    const { saleRegions } = this.props;
    // console.log(this.props.regionLocal?.selectedBrand);
    const selectedBrand = this.props.regionLocal?.selectedBrand;
    if (saleRegions) {
      return saleRegions.map((region) => {
        return (
          <Panel
            header={region.name}
            onClick={() => {
              // console.log('click on Panel');
            }}
            key={region._id}
          >
            {/* {renderBranchesHelper(region.branches, region)} */}
            {region.branches.map((branch) => {
              return (
                <Space key={branch._id} size="middle">
                  {branch.disabled ? (
                    <Popover
                      placement="left"
                      title="Showroom tạm khoá"
                      content="Showroom đang tạm khoá nhằm tuân thủ phòng chống dịch Covid-19"
                    >
                      <p style={{ fontSize: '14px', textAlign: 'left' }}>
                        <FeatherIcon
                          icon="slash"
                          size={14}
                          style={{
                            magrinBottom: '0px',
                            marginRight: '10px',
                            color: 'red',
                          }}
                        />{' '}
                        <span>{branch.name}:</span> {branch.address.addressNo}
                      </p>
                    </Popover>
                  ) : (
                    <p
                      onClick={() => {
                        //   handleChoose(branch, region);
                        this.handleChooseRegion({
                          ...region,
                          selectedBrand: branch,
                        });
                      }}
                      style={{
                        fontSize: '14px',
                        textAlign: 'left',
                        color:
                          selectedBrand?._id === branch._id
                            ? 'goldenrod'
                            : '#333',
                      }}
                    >
                      <span>{branch.name}:</span> {branch.address.addressNo}
                    </p>
                  )}
                </Space>
              );
            })}
          </Panel>
        );
      });
    }
  };
  handleChooseRegion = (region) => {
    // // console.log(region)
    this.props.chooseRegion(region);
  };
  renderCategoriesHelper = () => {
    const { categories } = this.props;
    if (categories) {
      return categories.map((cat, idx) => {
        return (
          <li key={idx} className="nav__category--item">
            <Link to={`/products/${cat._id}`}>
              {/* {t(mapCategory(cat.name))} */}
              {cat.name}
            </Link>
          </li>
        );
      });
    }
  };

  handleSubmitSearch = (values) => {
    // // console.log(values);
    if (values.keyword.trim()) {
      this.props.history.push(`/search/${values.keyword}`);
    }
  };
  renderSelectRegion = () => {
    if (typeof window === 'undefined') return;
    const { pathname } = window?.location;
    if (pathname === '/checkout') {
      return <p>{this.props.i18n.t('header.showroomWarn')}</p>;
    }
    if (pathname === '/orders') {
      return <p>{this.props.i18n.t('changeShowroom')}</p>;
    }
    return <Collapse ghost>{this.renderSaleRegions()}</Collapse>;
  };

  render() {
    const numbersOnCart = Object.keys(this.props.cartItems).length;
    const { t, lang: language } = this.props.i18n;
    let windowLocal = typeof window === 'undefined' ? {} : window;
    // // console.log(this.props.GoogleUrl, this.props.FBUrl )
    return (
      <React.Fragment>
        <header
          className="header"
          style={{ backgroundImage: `url(${bgHeader})` }}
        >
          <div className="header__offer">
            <div className="header__offer--text">
              {/* <p>
                                Giảm giá sốc hàng tuần
                                <span className="highlight-text"> 50%</span>
                            </p> */}
            </div>
            <div className="header__offer--location">
              <i className="fas fa-map-marker-alt" />
              <span>
                {t('location')}: {this.props.region && this.props.region.name}
              </span>
              <div className="location__dropdown">
                {this.renderSelectRegion()}
              </div>
            </div>
            <div className="header__offer--location">
              {/* <i className="fas fa-map-marker-alt" /> */}
              <i className="far fa-map"></i>
              <span>
                {t('switchLan')}: {language === 'vn' ? 'Vietnamese' : 'English'}
              </span>
              <div className="location__dropdown">
                <p
                  onClick={() => {
                    this.props.switchLang('vn');
                  }}
                  className={language === 'vn' && 'active'}
                >
                  Vietnamese
                </p>
                <p
                  onClick={() => {
                    this.props.switchLang('en');
                  }}
                  className={language === 'en' && 'active'}
                >
                  English
                </p>
              </div>
            </div>
          </div>
          <div className="header__user">
            <div className="header__user__logo">
              {/* <Logo className="logo"/> */}
              <img src={logo} alt="logo" />
            </div>
            <div className="header__user__search">
              <Form ref={this.formRef} onFinish={this.handleSubmitSearch}>
                <Form.Item name="keyword">
                  <Input
                    className="input__radius"
                    placeholder={t('searchPlaceholder')}
                  />
                </Form.Item>
              </Form>
            </div>
            <div className="header__user__action">
              <div className="header__user__action--desktop">
                {/* <LoginRegister
                  GoogleUrl={this.props.GoogleUrl}
                  FBUrl={this.props.FBUrl}
                /> */}

                <Link to="/orders">
                  <div className="header__user__action--cart nav-action-style">
                    <i className="fas fa-cart-plus icon-style" />

                    <div className="cart__checkout__container">
                      <div className="cart__checkout__header">
                        <h1>{t('cart')}</h1>
                      </div>
                      {windowLocal?.location?.pathname === '/checkout' ? (
                        <p>{t('warnCart')}</p>
                      ) : (
                        this.renderProductCheckout()
                      )}
                      <div className="cart__product__total">
                        <div className="cart__product__total--label">
                          <span>{t('total')}</span>
                        </div>
                        <div className="cart__product__total--price">
                          <span>
                            {addCommas(this.getTotalQuantityAndPrice())}đ
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="notification">
                      <p>{numbersOnCart}</p>
                    </div>
                    <span>{addCommas(this.getTotalQuantityAndPrice())}đ</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <HeaderMobile categories={this.props.categories} />
          <div className="header__navigation">
            <div className="nav__category nav__category__click">
              <i className="fas fa-bars nav__category__click" />
              <p className="nav__category__click">{t('category')}</p>
              <div className="nav__category--list">
                <ul>{this.renderCategoriesHelper()}</ul>
              </div>
            </div>
            <div className="nav__navigation">
              <ul>
                <li>
                  <NavLink exact to="/" activeClassName="active__nav">
                    {t('header.home')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/products/${
                      this.props.categories && this.props.categories[0]._id
                    }`}
                    activeClassName="active__nav"
                  >
                    {/* Sản Phẩm */}
                    {t('header.products')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news" activeClassName="active__nav">
                    {t('header.news')}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/recipes" activeClassName="active__nav">
                    {t('header.recipe')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about-us" activeClassName="active__nav">
                    {t('header.stores')}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/contact" activeClassName="active__nav">
                    {t('header.about')}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="nav__contact">
              <i className="fas fa-headphones" />
              <p>0917 202 639</p>
            </div>
            <div className="nav__slide__menu">
              <i id="slide__menu__left" className="fas fa-bars" />
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}
// export default Header;

export default withTranslation(Header, 'common');