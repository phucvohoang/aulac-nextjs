import React from "react";
import './ProductDetailSuggestion.styled.scss';

import productImg_10 from "../../assets/products/product-7.jpg";
import productImg_11 from "../../assets/products/bakery_2.jpg";
import productImg_12 from "../../assets/products/wine-beer_3.jpg";
import Product from "../Product/Product";

const ProductDetailSuggestion = () => {
    const products = [
        {
            id: 10,
            name: 'Morrisons Seedless Red Grapes',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque libero.',
            image: productImg_10,
            price: '143.26',
            category: "Fruits & Veges"
        },
        {
            id: 11,
            name: 'Organic Cacao Nibs Shaker',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque libero.',
            image: productImg_11,
            price: '169.18',
            category: "Vegetables"
        },
        {
            id: 12,
            name: 'Red & White Seedless Grapes 500g',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque libero.',
            image: productImg_12,
            price: '179.98',
            category: "Fruits & Veges"
        }
    ];
    const renderProduct = () => {
        return products.map((p, idx) => {
            return <Product key={idx} product={p}/>
        })
    }

    return (
        <div className="product-detail__suggestion__container">
            <div className="product-detail__suggestion__header">
                <h1>YOU MAY ALSO LIKE...</h1>
            </div>
            <div className="product-detail__suggestion__body">
                {renderProduct()}
            </div>
        </div>
    )
}

export default ProductDetailSuggestion;
