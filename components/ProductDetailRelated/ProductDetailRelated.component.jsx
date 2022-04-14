import React from "react";
import './ProductDetailRelated.styled.scss';

import productImg_7 from "../../assets/products/product-6.jpg";
import productImg_8 from "../../assets/products/organic-4.jpg";
import productImg_9 from "../../assets/products/product-2.jpg";
import Product from "../Product/Product";

const ProductDetailRelated = () => {
    const products = [
        {
            id: 7,
            name: 'Jaffa Candy Floss Grapes',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque libero.',
            image: productImg_7,
            price: '157.23',
            category: "Uncategorized"
        },
        {
            id: 8,
            name: 'Lundberg Organic Rice, White Basmati',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque libero.',
            image: productImg_8,
            price: '127.51',
            category: "Fruits & Veges"
        },
        {
            id: 9,
            name: 'Meat, fish & poultry',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque libero.',
            image: productImg_9,
            price: '124.90',
            category: "Uncategorized"
        }
    ];

    const renderProduct = () => {
        return products.map((p, idx) => {
            return <Product product={p} key={idx}/>
        })
    }

    return (
        <div className="product-detail__related__container">
            <div className="product-detail__related__header">
                <h1>RELATED PRODUCTS</h1>
            </div>
            <div className="product-detail__related__body">
                {renderProduct()}
            </div>
        </div>
    )
}

export default ProductDetailRelated;
