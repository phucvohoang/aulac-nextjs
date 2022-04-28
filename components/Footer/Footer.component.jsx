import React from 'react';
import Link from 'next/link';
// import ActiveLink from '../Link/Link';
//import footerBackgroundImg from './../../public/assets/footer/footer-bg.png';
import { mapCategory } from '../../util/helper';
import WrapperTranslate from '../WrapperTranslate/WrapperTranslate';

const satisfactionImg = '/assets/footer/satisfaction.png';
const saveMoneyImg = '/assets/footer/save-money.png';
const fastShippingImg = '/assets/footer/fast-shipping.png';
const moneyBackImg = '/assets/footer/money-back.png';
const supportImg = '/assets/footer/support.webp';
const logo = '/assets/logo.webp';
class Footer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   footerGuaranteeData: [
    //     {
    //       img: satisfactionImg,
    //       title: ['100%', 'Satisfaction'],
    //       content:
    //         'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
    //     },
    //     {
    //       img: saveMoneyImg,
    //       title: ['Save 20%%', 'when you'],
    //       content:
    //         'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
    //     },
    //     {
    //       img: fastShippingImg,
    //       title: ['Fast Free%', 'Shipment'],
    //       content:
    //         'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
    //     },
    //     {
    //       img: moneyBackImg,
    //       title: ['14-Day', 'Money Back'],
    //       content:
    //         'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
    //     },
    //   ],
    // };
  }

  style = {
    backgroundColor: '#fff',
  };

  // renderFooterGuarantee = () => {
  //   const { footerGuaranteeData } = this.state;

  //   return footerGuaranteeData.map((g, idx) => {
  //     return (
  //       <div className="guarantee__block" key={idx}>
  //         <div className="guarantee__block__header">
  //           <div className="block__header__img">
  //             <img src={g.img} alt={`Guarantee ${idx}`} />
  //           </div>
  //           <div className="block__header__title">
  //             {g.title.map((t, idxT) => {
  //               return <span key={idxT}>{t}</span>;
  //             })}
  //           </div>
  //         </div>
  //         <div className="guarantee__block__body">
  //           <p>{g.content}</p>
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  renderCategory = () => {
    const { categories } = this.props;
    console.log('this is categories in footer');
    console.log(categories);
    if (categories) {
      return categories.map((cat, idx) => {
        return (
          <li key={idx}>
            <Link href={`/products/${cat._id}`}>
              {this.props.t(mapCategory(cat.name))}
            </Link>
          </li>
        );
      });
    } else {
      return <p>Empty</p>;
    }
  };
  render() {
    return (
      <div className="footer" style={this.style}>
        <div className="footer__information">
          <div className="information__logo">
            <img src={logo} alt="logo-aulac" />
            <p>{this.props.t('footer.desc')}</p>
          </div>
          {/* <Link href="/contact">{this.props.t('header.about')}</Link>  */}
          <div className="information__info">
            <h4 className="information--header">
              {this.props.t('footer.inforCol.title')}
            </h4>
            <ul className="information--link">
              <li>
                <Link href="/contact">{this.props.t('header.about')}</Link>
              </li>
              <li>
                <Link href="/privacy">{this.props.t('footer.privacy')}</Link>
              </li>
            </ul>
          </div>
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
          </div>
        </div>
      </div>
    );
  }
}
const Testing = (props) => {
  return <h1>This is footer</h1>;
};

export default WrapperTranslate(Footer);
