import React from 'react';
import { getBanner } from '../../util/helper';
import Image from 'next/image'
// import './ProductsHeader.styled.scss';
// import banner from '../../public/assets/banners/an-lien.jpg';
const ProductsHeader = ({ title, name = '' }) => {
  const getBannerImage = () => {
    if (name) {
      const bannerImage = getBanner(name.toLowerCase());
      return bannerImage;
    }
  };
  return (
    <React.Fragment>
      <div className="section__header__box">
        <div className="title__box">
          <div className="section__header__sub-title">
            <span>
              <i className="fas fa-home" />
            </span>
            <span className="highlight-text">{title}</span>
          </div>
          <div className="section__header__title">
            <h1>{title}</h1>
          </div>
        </div>
        {name && (
          <div className="banner__box">
            <Image src={getBannerImage()} alt="" layout='fill' />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductsHeader;
