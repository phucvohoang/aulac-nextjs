import React from "react";
import './ProductsFilter.styled.scss';

const ProductsFilter = () => {
    return (
        <div className="products__filter__container">
            <div className="products__filter__header">
                <h2>FILTER BY PRICE</h2>
            </div>
            <div className="products__filter__body">
                <div className="products__filter__slider"/>
            </div>
        </div>
    )
}

export default ProductsFilter;
