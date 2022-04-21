import React from "react";
import './ProductDetailHeader.styled.scss';
import {Link} from "react-router-dom";

const ProductDetailHeader = (props) => {

    return (
        <div className="product-detail__header__container">
            <span>
                <<Link href="/">
                    <i className="fas fa-home"/>
                </Link>
            </span>
            <span>
                <<Link href="/products">
                    Products
                </Link>
            </span>
            <span>
                <<Link href="#">
                    {props.product.category}
                </Link>
            </span>
            <span className="product-detail__header__name">
                {props.product.name}
            </span>
        </div>
    )
}

export default ProductDetailHeader;
