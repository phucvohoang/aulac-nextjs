import React from "react";
import SectionHeader from '../../../components/SectionHeader/SectionHeader.component.jsx'
import ProductsCategory from '../../../components/ProductsCategory/ProductCategory.container.js'
import Article from '../../../components/ArticleDetail/ArticleDetail.component'
const News = ({data}) => {
    // console.log(data)
    return (
        <div className="news__container">
            <div className="news__header">
                <SectionHeader />
            </div>
            <div className="news">
                <div className="news__category">
                    <ProductsCategory/>
                    {/* <ProductsOnSale/> */}
                </div>
                <div className="news__content">
                    {/* <ProductsList categoryID={categoryID} /> */}
                    <Article data={data}/> 
                </div>
            </div>
        </div>
    )
}

export default News;
