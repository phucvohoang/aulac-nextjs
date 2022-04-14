import React from 'react';
import { Link } from 'react-router-dom';
//import footerBackgroundImg from './../../assets/footer/footer-bg.png';

import satisfactionImg from '../../assets/footer/satisfaction.png';
import saveMoneyImg from '../../assets/footer/save-money.png';
import fastShippingImg from '../../assets/footer/fast-shipping.png';
import moneyBackImg from '../../assets/footer/money-back.png';
//import {ReactComponent as Logo} from '../../assets/footer/logo.svg'

// import faceBookImg from '../../assets/footer/facebook.png';
// import twitterImg from '../../assets/footer/twitter.png';
// import instagramImg from '../../assets/footer/instagram.png';
// import googlePlusImg from '../../assets/footer/google-plus.png';
// import linkedinImg from '../../assets/footer/linkedin.png';

import supportImg from '../../assets/footer/support.png';
//import paymentImg from '../../assets/footer/payments.png';
import logo from '../../assets/logo.jpg';
import { withTranslation } from 'react-i18next';
import { mapCategory } from '../../util/helper';
//const logo = "https://aulacshop.com/assets/img/logo.png"
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerGuaranteeData: [
        {
          img: satisfactionImg,
          title: ['100%', 'Satisfaction'],
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
        },
        {
          img: saveMoneyImg,
          title: ['Save 20%%', 'when you'],
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
        },
        {
          img: fastShippingImg,
          title: ['Fast Free%', 'Shipment'],
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
        },
        {
          img: moneyBackImg,
          title: ['14-Day', 'Money Back'],
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
        },
      ],
    };
  }

  style = {
    //backgroundImage: footerBackgroundImg,
    backgroundColor: '#fff',
  };

  renderFooterGuarantee = () => {
    const { footerGuaranteeData } = this.state;

    return footerGuaranteeData.map((g, idx) => {
      return (
        <div className="guarantee__block" key={idx}>
          <div className="guarantee__block__header">
            <div className="block__header__img">
              <img src={g.img} alt={`Guarantee ${idx}`} />
            </div>
            <div className="block__header__title">
              {g.title.map((t, idxT) => {
                return <span key={idxT}>{t}</span>;
              })}
            </div>
          </div>
          <div className="guarantee__block__body">
            <p>{g.content}</p>
          </div>
        </div>
      );
    });
  };

  renderCategory = () => {
    const { categories } = this.props;
    if (categories) {
      return categories.map((cat, idx) => {
        return (
          <li key={idx}>
            <Link to={`/products/${cat._id}`}>
              {this.props.t(mapCategory(cat.name))}
            </Link>
          </li>
        );
      });
    }
  };
  render() {
    return (
      <div className="footer" style={this.style}>
        {/* <div className="footer__guarantee">
                    {this.renderFooterGuarantee()}
                </div> */}

        <div className="footer__information">
          <div className="information__logo">
            <img src={logo} alt="logo-aulac" />
            <p>{this.props.t('footer.desc')}</p>
            {/* <div className="information__logo--social">
                            <img src={faceBookImg} alt="facebook"/>
                            <img src={twitterImg} alt="twitter"/>
                            <img src={instagramImg} alt="instagram"/>
                            <img src={googlePlusImg} alt="google plus"/>
                            <img src={linkedinImg} alt="linkedin"/>
                        </div> */}
          </div>
          <div className="information__info">
            <h4 className="information--header">
              {this.props.t('footer.inforCol.title')}
            </h4>
            <ul className="information--link">
              <li>
                <Link to="/contact">{this.props.t('header.about')}</Link>
              </li>
              <li>
                <Link to="/privacy">{this.props.t('footer.privacy')}</Link>
              </li>
            </ul>
          </div>
          {/* <div className="information__links">
                        <h4 className="information--header">Quick Links</h4>
                        <ul className="information--link">
                            <li>
                                <Link to="#">Speacial Offer</Link>
                            </li>
                            <li>
                                <Link to="#">Gift Cards</Link>
                            </li>
                            <li>
                                <Link to="#">F21 Red</Link>
                            </li>
                            <li>
                                <Link to="#">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="#">California Privacy Rights</Link>
                            </li>
                            <li>
                                <Link to="#">CA Transparencyy in Store</Link>
                            </li>
                            <li>
                                <Link to="#">Teams of Use</Link>
                            </li>
                        </ul>
                    </div> */}
          <div className="information__category">
            <h4 className="information--header">{this.props.t('category')}</h4>
            <ul className="information--link">{this.renderCategory()}</ul>
          </div>
          <div className="information__contact">
            <h4 className="information--header">
              {this.props.t('footer.contactCol.title')}
            </h4>
            <div className="contact__header">
              <img src={supportImg} alt="contact" />
              <div className="contact__header--content">
                <span>{this.props.t('footer.phoneSupport')}</span>
                <span>0917 202 639 </span>
              </div>
            </div>
            {/* <p>
                            GymVast, 18 East 50th Street, 4th Floor, New York, NY 10022
                        </p>
                        <p>
                            support@example.com
                        </p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(Footer);
