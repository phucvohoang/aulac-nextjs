import React from 'react';
import ContactMap from './ContactMap.component';
import { withTranslation } from 'react-i18next';
//import Input from '../InputGroup/InputGroup.jsx'
//https://validatejs.org/

class ContactUsForm extends React.Component {
  renderBranch = (branches) => {
    return branches.map((branch, idx) => {
      //   console.log(branch._id);
      return <li key={branch._id}>{branch.name}</li>;
    });
  };
  renderRegions = () => {
    const { regions } = this.props;
    if (regions.length > 0) {
      return regions.map((region, idx) => {
        return (
          <React.Fragment>
            <h2 key={region._id}>{region.name}</h2>
            <ol key={idx}>{this.renderBranch(region.branches)}</ol>
          </React.Fragment>
        );
      });
    }
  };
  render() {
    return (
      <div className="contact__form__container">
        <div className="contact__form__map" id="contact__map">
          <ContactMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBl6Q18pt3Waw2c-ugzsjpW0kgmTAJUxCA&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <div className="contact__form__message">
          <h2
            style={{
              borderBottom: '.1rem solid #ececec',
              paddingBottom: '1rem',
            }}
          >
            {/* Danh Sách Chi Nhánh */}
            {this.props.t('listStore')}
          </h2>
          {this.renderRegions()}
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(ContactUsForm);
/*
<form action="#" className="contact__form">
                        <div  className="contact__form--header">
                            <h1>TELL US YOUR MESSAGE</h1>
                            <p>
                                Your email address will not be published.
                                Required fields are marked *
                            </p>
                        </div>
                        <div className="contact__form--name">
                            <label htmlFor="name">Your Name *</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="e.g., John Doe"
                                className="contact__input__name"
                            />
                        </div>
                        <div className="contact__form--phone-email">
                            <div className="contact__form--phone">
                                <label htmlFor="phone">Your Phone *</label>
                                <input
                                    type="phone"
                                    id="phone"
                                    placeholder="Phone Number"
                                    className="contact__input__phone"/>
                            </div>
                            <div className="contact__form--email">
                                <label htmlFor="email">Your Email *</label>
                                <input type="email"
                                       id="email"
                                       placeholder="name@example.com"
                                       className="contact__input__email"
                                />
                            </div>
                        </div>
                        <div className="contact__form--message-text">
                            <label htmlFor="message">Your Message *</label>
                            <textarea
                                id="message"
                                className="contact__input__message"
                                rows="5"
                            />
                        </div>
                        <div className="contact__form--message-action">
                            <button className="contact__btn">CONTACT US</button>
                        </div>
                    </form>

*/
