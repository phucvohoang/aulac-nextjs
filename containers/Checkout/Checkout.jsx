import React from 'react';
import { notification } from 'antd';
// import { withRouter } from 'react-router-dom';
import Information from './Information/Infromation';
import Address from './Address/Address.container';
import Pay from './Pay/Pay.container';
import Summary from './Summary/Summary.container';
import SectionHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import { getItem, setItem } from '../../util/localStorage';
import FeatherIcon from 'feather-icons-react';
// import { withTranslation } from 'react-i18next';
import {
  fowardToNextStep,
  backToLastStep,
} from '../../lib/graphql/resolvers/utils';
import WrapperTranslate from '../../components/WrapperTranslate/WrapperTranslate';
import WrapperRouter from '../../components/WrapperRouter/WrapperRouter';

class Checkout extends React.Component {
  //formRef = React.createRef();
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      firstName: '',
      lastName: '',
      typeAddress: 'new',
      addressNo: '',
      city: '',
      district: '',
      ward: '',
      note: '',
      phone: '',
      email: '',
      isCod: true,
      shippingAddress: '',
      coupon: '',
      appliedCouponSuccess: false,
      errorMissing: '',
      customerPoint: 0,
      isRequiredVatInvoice: false,
      isModalVisible: false,
      shippedBy: 'aulac',
      currentDataForm: null,
      isShippedToHNOrHCM: false,

      step: 1,
      dataCheckout: {
        checkout: null,
        ['step-1']: null,
        ['step-2']: null,
        ['step-3']: null,
      },
    };
  }
  componentDidMount() {
    // //console.log(this.props);
    const oldStep = getItem('currentStepCheckout');
    const checkoutData = getItem('checkoutData');
    if (!checkoutData || !oldStep) {
      this.setState(() => ({ step: oldStep ? oldStep : 1 }));
      return;
    } else {
      //console.log('=========== in else case ===========');
      if (oldStep > 1) {
        let termStep = oldStep;
        // const listAllStep = Object.keys(checkoutData).filter(item => item.startsWith('step-'));
        for (let i = oldStep; i > 0; i--) {
          if (!checkoutData[`step-${i}`]) {
            termStep = i;
            // break;
          }
        }
        this.setState(() => ({ step: termStep }));

        return;
      }
    }
  }

  goBack = () => {
    backToLastStep();
  };
  goFoward = (dataAtStep) => {
    fowardToNextStep(dataAtStep);
  };
  renderContentHelper = () => {
    // const { step } = this.state;
    const { currentUser, cartItems, isLoggedIn, checkoutData } = this.props;
    const step = checkoutData.currentStep;
    switch (step) {
      case 1:
        return (
          <Information
            currentUser={currentUser}
            fowardToNextStep={this.goFoward}
            backToLastStep={this.goBack}
          />
        );
      case 2:
        return (
          <Address
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            fowardToNextStep={this.goFoward}
            backToLastStep={this.goBack}
          />
        );
      case 3:
        return (
          <Pay
            fowardToNextStep={this.goFoward}
            backToLastStep={this.goBack}
            cartItems={cartItems}
          />
        );
      case 4:
        return (
          <Summary
            // history={this.props.history}
            currentUser={currentUser}
            cartItems={cartItems}
            checkoutData={checkoutData.checkoutData.checkout}
            fowardToNextStep={this.goFoward}
            backToLastStep={this.goBack}
          />
        );
    }
  };
  render() {
    const step = this.props.checkoutData.currentStep;
    const { t } = this.props;
    return (
      <>
        <div className="profile__header">
          {/* <ProductsHeader /> */}
          <SectionHeader title="Thanh Toán" />
        </div>
        <div className="checkout__page">
          {/* <div> */}
          <div className="checkout__page__navigate--mobile">
            <div
              className={`checkout__page__navigate--mobile--item ${
                step > 1 ? 'completed' : step === 1 && 'active'
              }`}
            >
              <p className="text__navigate">1</p>
              <p className="complete__icon">
                <FeatherIcon icon="check-circle" size={16} />
              </p>
            </div>
            <div className="checkout__page__navigate--mobile--line"></div>
            <div
              className={`checkout__page__navigate--mobile--item ${
                step > 2 ? 'completed' : step === 2 && 'active'
              }`}
            >
              <p className="text__navigate">2</p>
              <p className="complete__icon">
                <FeatherIcon icon="check-circle" size={16} />
              </p>
            </div>
            <div className="checkout__page__navigate--mobile--line"></div>
            <div
              className={`checkout__page__navigate--mobile--item ${
                step > 3 ? 'completed' : step === 3 && 'active'
              }`}
            >
              <p className="text__navigate">3</p>
              <p className="complete__icon">
                <FeatherIcon icon="check-circle" size={16} />
              </p>
            </div>
            <div className="checkout__page__navigate--mobile--line"></div>
            <div
              className={`checkout__page__navigate--mobile--item ${
                step > 4 ? 'completed' : step === 4 && 'active'
              }`}
            >
              <p className="text__navigate">4</p>
              <p className="complete__icon">
                <FeatherIcon icon="check-circle" size={16} />
              </p>
            </div>
          </div>
          <div className="checkout__page__navigate">
            <h3 className="heading">{t('checkoutpage.checkoutProcess')}</h3>
            <div
              className={`checkout__page__navigate--item ${
                step > 1 ? 'completed' : step === 1 && 'active'
              }`}
            >
              <p>{t('checkoutpage.information')}</p>
              <span>
                <FeatherIcon icon="check-circle" size={16} />
              </span>
            </div>
            <div
              className={`checkout__page__navigate--item ${
                step > 2 ? 'completed' : step === 2 && 'active'
              }`}
            >
              <p>{t('checkoutpage.address')}</p>
              <span>
                <FeatherIcon icon="check-circle" size={16} />
              </span>
              <span></span>
            </div>
            <div
              className={`checkout__page__navigate--item ${
                step > 3 ? 'completed' : step === 3 && 'active'
              }`}
            >
              <p>{t('checkoutpage.other')}</p>
              <span>
                <FeatherIcon icon="check-circle" size={16} />
              </span>
            </div>
            <div
              className={`checkout__page__navigate--item ${
                step > 4 ? 'completed' : step === 4 && 'active'
              }`}
            >
              <p>{t('checkoutpage.complete')}</p>
            </div>
          </div>
          <div className="checkout__page__content">
            {this.renderContentHelper()}
          </div>

          {/* End Old Form*/}
        </div>
      </>
    );
  }
}

export default WrapperRouter(WrapperTranslate(Checkout));
