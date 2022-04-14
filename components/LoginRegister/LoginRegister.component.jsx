import { notification, Button, Spin, Row } from 'antd';
import React from 'react';
import { Link } from 'next/link';
import { registerTokenAndSubscribe } from '../../firebase/firebase.util';
import { withTranslation } from 'react-i18next';
import { getItem } from '../../util/localStorage';
// import axios from 'axios';

// const BASE_URL = 'https://aulac-api.purplese.com'
class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignInForm: true,
      email: '',
      password: '',
      name: '',
      phone: '',
      isProcessing: false,
      registerSuccess: false,
      // isProcessing: false,
    };
  }
  callback = () => {
    // // console.log('running callback function');
    localStorage.clear();
  };
  handleLogin = async () => {
    const { email, password } = this.state;
    this.props
      .login(email, password)
      .then((res) => {
        // console.log(res);
        this.setState(() => ({
          email: '',
          password: '',
          name: '',
          phone: '',
          isProcessing: false,
        }));
      })
      .catch((e) => {
        // console.log(e);
        notification.error({
          message: 'Lỗi',
        });
      });
  };
  handleLogOut = async () => {
    this.props.setUser({}, this.callback);
  };
  switchMode = () => {
    this.setState((prevState) => ({
      isSignInForm: !prevState.isSignInForm,
      email: '',
      password: '',
      name: '',
      phone: '',
      registerSuccess: false,
    }));
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    // // console.log(name, value)
    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // // console.log('Get Submit')
    const { isSignInForm } = this.state;
    this.setState(() => ({ isProcessing: true }));
    if (isSignInForm) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  };
  registerSuccess = () => {
    // // console.log('register success, im callback function')
    this.setState(() => ({ registerSuccess: true }));
    setTimeout(() => {
      this.switchMode();
    }, 500);
  };
  handleRegister = async () => {
    const { name, phone, email, password } = this.state;
    const deviceToken = getItem('deviceToken');
    if (name && phone && email && password) {
      const payload = {
        email,
        password,
        name,
        phone,
        deviceToken: deviceToken ? deviceToken : '',
        isFromWeb: true,
      };
      this.props
        .register({
          variables: {
            registerInput: payload,
          },
        })
        .then((res) => {
          // console.log(res);
          const userInfo = { _id: res.data?.register?.userId ?? '' };
          // console.log(userInfo);
          registerTokenAndSubscribe(userInfo);
          this.setState(() => ({
            email: '',
            password: '',
            name: '',
            phone: '',
            isProcessing: false,
          }));
          notification.success({
            message: 'Đăng ký thành công',
          });
        })
        .catch((e) => {
          // console.log('Error when registering');
          // // console.log(e);
          this.setState(() => ({
            isProcessing: false,
          }));
          notification.error({
            message: 'Lỗi',
            description: `${e.message}`,
          });
        });
    } else {
      // console.log('Missing data');
      notification.error({
        message: 'Lỗi',
        description: 'Xin cung cấp đủ thông tin',
      });
      this.setState(() => ({ isProcessing: false }));
    }
  };

  handleLoginWithSNS = (type) => {
    // // console.log(this.props)
    if (type === 'google') {
      ///window.location.href = this.props.
      // // console.log(this.props.GoogleUrl)
      window.location.href = this.props.GoogleUrl;
    } else if (type === 'facebook') {
      // // console.log(this.props.FBUrl)
      window.location.href = this.props.FBUrl;
    }
  };
  handleClickForgetPW = () => {
    // // console.log(this.props);
    // const location = useLocation();
    // console.log(location);
  };
  render() {
    const { isSignInForm, email, password, name, phone } = this.state;
    const { user, isLoggedIn, t } = this.props;
    const styleForgetPassword = {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '15px 0px',
      cursor: 'pointer',
      color: '#333',
    };
    // let isLoggedIn = Object.keys(this.props.user).length > 0;
    return (
      <div className="header__user__action--login nav-action-style">
        {isLoggedIn ? (
          user.avatar ? (
            <div className="user__avatar">
              {' '}
              <img src={user.avatar} className="avatar" alt="user-avatar" />
            </div>
          ) : (
            <i className="far fa-user icon-style" />
          )
        ) : (
          <i className="far fa-user icon-style" />
        )}
        {isLoggedIn ? (
          <div>
            <p className="username__field">{user.name}</p>
          </div>
        ) : (
          <p>
            {t('login')} <span className="highlight-text">/</span>{' '}
            {t('register')}
          </p>
        )}

        <div className="header__user__action--login-form">
          {isLoggedIn ? (
            <div className="login__form--header">
              <h1>{user.name}</h1>

              <div className="user__actions">
                <div className="user__action--link">
                  <Link to="/profile">{t('account')}</Link>
                </div>
              </div>
              <div className="user__actions">
                <div className="user__action--link">
                  <Link to="/chat">{t('message')}</Link>
                </div>
              </div>
              <div className="user__actions">
                <div className="user__action--link">
                  <p onClick={this.handleLogOut}>{t('logout')}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="login__form--header not__login">
              {isSignInForm ? <h1>{t('login')}</h1> : <h1>{t('register')}</h1>}
              <p style={{ cursor: 'pointer' }} onClick={this.switchMode}>
                {' '}
                {isSignInForm ? `${t('register')}` : `${t('login')}`}
              </p>
            </div>
          )}
          {!isLoggedIn && (
            <React.Fragment>
              <form onSubmit={this.handleSubmit} autoComplete="off">
                <div className="login__form--username">
                  <label className="form-label-style" htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={this.handleChange}
                    className="input__radius"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="login__form--password">
                  <label className="form-label-style" htmlFor="password">
                    {t('password')} <span className="required">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={this.handleChange}
                    className="input__radius"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                {isSignInForm && (
                  <div
                    onClick={this.handleClickForgetPW}
                    style={styleForgetPassword}
                  >
                    <Link style={{ color: '#333' }} to="/forget-password">
                      Forget Password
                    </Link>
                  </div>
                )}
                {!isSignInForm && (
                  <React.Fragment>
                    <div className="login__form--username">
                      <label className="form-label-style" htmlFor="firstName">
                        {t('name')}
                        <span className="required">*</span>
                      </label>
                      <input
                        value={name}
                        onChange={this.handleChange}
                        className="input__radius"
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="login__form--password">
                      <label className="form-label-style" htmlFor="lastName">
                        {t('phoneNumber')} <span className="required">*</span>
                      </label>
                      <input
                        value={phone}
                        onChange={this.handleChange}
                        className="input__radius"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                      />
                    </div>
                  </React.Fragment>
                )}
                {this.state.registerSuccess ? (
                  <div className="login__form--action">
                    <button disabled={true} type="submit">
                      {t('success')}
                    </button>
                  </div>
                ) : (
                  <div className="login__form--action">
                    {this.state.isProcessing ? (
                      <Row style={{ width: '100%' }} justify="center">
                        <Spin />
                      </Row>
                    ) : (
                      <button type="submit">
                        {/* {isSignInForm ? 'Đăng Nhập' : 'Đăng Ký'} */}
                        {isSignInForm ? `${t('login')}` : `${t('register')}`}
                      </button>
                    )}

                    {/* <span>
                                        <Link to="#">Lost your password?</Link>
                                    </span> */}
                  </div>
                )}
              </form>
              {this.state.isSignInForm && (
                <div className="login__form--SNS">
                  <button
                    onClick={() => {
                      this.handleLoginWithSNS('google');
                    }}
                    disabled={this.state.isProcessing}
                    className="google"
                    type="submit"
                  >
                    {t('signInWithGoogle')}
                  </button>
                  <button
                    onClick={() => {
                      this.handleLoginWithSNS('facebook');
                    }}
                    className="facebook"
                    type="submit"
                    disabled={this.state.isProcessing}
                  >
                    {/* Đăng nhập với Facebook */}
                    {t('signInWithFacebook')}
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

// export default withTranslation('common')(LoginRegister);
export default LoginRegister;
