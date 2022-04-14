import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCategory from './ProductsCategory.component'
const LIST_CATEGORIES = gql`
    query ListCategories {
        listCategories {
            _id
            name
        }
    }
`;

const ProductCategoryContainer = () => {
    const { data, loading, error } = useQuery(LIST_CATEGORIES);

    if(loading) {
        return <p>Loading...</p>
    }
    if(error){
        return <p>We have an error...</p>
    }

    const { listCategories } = data;
    return <ProductCategory categories={listCategories} />
}

export default ProductCategoryContainer;