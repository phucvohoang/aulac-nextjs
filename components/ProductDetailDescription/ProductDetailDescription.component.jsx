import React from 'react';
import {
  cleaningDescription,
  convertDataEditorToHTML,
} from '../../util/helper';
import WrapperTranslate from '../WrapperTranslate/WrapperTranslate';
//import './ProductDetailDescription.styled.scss';
// import { withTranslation } from 'react-i18next';
class ProductDetailDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: '1',
    };
  }

  tabHeaderClick = (e, tabIdx) => {
    const currentTab = e.target;
    const selectedTabHeader = document.querySelector('.selected--tab--header');

    if (selectedTabHeader) {
      selectedTabHeader.classList.remove('selected--tab--header');
    }

    this.setState(() => {
      return {
        tabIndex: tabIdx,
      };
    });
    currentTab.classList.add('selected--tab--header');
  };
  renderDescription = (descriptions) => {
    const { description } = this.props.product;
    if (description) {
      try {
        const parsedDescription = JSON.parse(description);
        const body = convertDataEditorToHTML(parsedDescription);
        return (
          <div
            className="description__body__desc"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        );
      } catch (e) {
        return (
          <div
            className="description__body__desc"
            dangerouslySetInnerHTML={{
              __html: cleaningDescription(description),
            }}
          />
        );
      }
    }
  };
  render() {
    // console.log(this.props)
    return (
      <div className="product-detail__description__container">
        <div className="product-detail__description__header">
          <span
            className="selected--tab--header"
            onClick={(e) => this.tabHeaderClick(e, '1')}
          >
            {/* Mô Tả Sản Phẩm */}
            {this.props.t('description')}
          </span>
        </div>
        <div className="product-detail__description__body">
          {this.renderDescription()}
        </div>
      </div>
    );
  }
}

export default WrapperTranslate(ProductDetailDescription);
