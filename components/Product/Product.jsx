import React, { useState } from 'react';
import Link from 'next/link';
// import { transformProductObject } from '../../lib/graphql/resolvers/utils.js';
import { addCommas } from '../../util/helper';
const Product = (props) => {
  //const idRegion = props.region ? props.region._id : ''
  //console.log(props.product)
  const slugCategory = props.slug;
  const [showOverlay, setOverlay] = useState(false);
  //let productCustom = transformProductObject(props.product, props.region);
  // console.log("================= im in Product ===================")
  //console.log(`Old Prices: ${props.product.salePrice}, new prices: ${productCustom.salePrice}`)
  const {
    // _id,
    images,
    name,
    salePrice,
    salePriceAfterDiscounted,
    // discountType,
    // discountValue,
    slug,
  } = props.product;
  const productCustom = {
    ...props.product,
    salePrice: props.product.salePriceAfterDiscounted,
  };
  const addSuccess = () => {
    setOverlay(true);
    setTimeout(() => {
      setOverlay(false);
    }, 500);
  };
  const addToCart = () => {
    props.addItem(productCustom, addSuccess);
  };
  const handleBuyNow = () => {
    props.buyNow(productCustom);
  };
  const handleActionWishList = () =>
    props.isInWishList ? handleRemoveWishList() : handleAddWishList();
  const handleAddWishList = () => {
    // console.log(productCustom._id)
    props.addWishList(props.product);
  };
  const handleRemoveWishList = () => {
    // console.log(productCustom._id)
    props.removeWishList(props.product);
  };
  let image =
    images.length > 0
      ? images[0]
      : 'https://aulacshop.com/uploads/img/1595487543_CHA-BONG-GA--GOI.jpg';
  // console.log(props.isInWishList)
  return (
    <div className="product">
      <div
        className={showOverlay ? 'product__overlay active' : 'product__overlay'}
      >
        <i className="fas fa-check-circle"></i>
      </div>
      {salePrice > salePriceAfterDiscounted && (
        <div className="product__save">
          <p>Sale</p>
        </div>
      )}

      <div className="product__image">
        <Link href={`/san-pham/${slugCategory}/${slug}`}>
          <img src={image} alt={name} />
        </Link>
      </div>

      <div className="product__content">
        <div className="product__actions">
          <div onClick={addToCart} className="product__action--cart">
            <i
              className={
                props.isInCart ? `fas fa-cart-plus active` : 'fas fa-cart-plus'
              }
            ></i>
          </div>
          <div onClick={handleActionWishList} className="product__action--like">
            <i
              className={
                props.isInWishList ? 'fas fa-heart active' : 'fas fa-heart'
              }
            ></i>
          </div>
          {/* <div className="product__action--compare">
                    <i className="fas fa-exchange-alt"></i>
                </div> */}
          <div onClick={handleBuyNow} className="product__action--share">
            <i className="fas fa-money-bill-wave"></i>
          </div>
        </div>
        <div className="product__name text-center">
          <Link href={`/product/${slug}`}>
            <h5>{name}</h5>
          </Link>
        </div>
        <div className="product__price text-center">
          {/* <p>{addCommas(salePriceAfterDiscounted)}</p> */}
          {salePrice > salePriceAfterDiscounted && (
            <span
              className="old__price"
              style={{
                color: 'rgb(102, 96, 96)',
                textDecoration: 'line-through',
                marginRight: '15px',
              }}
            >
              {addCommas(salePrice)}
            </span>
          )}

          <span>{addCommas(salePriceAfterDiscounted)}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
