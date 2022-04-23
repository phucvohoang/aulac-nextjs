import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductCategory from './ProductsCategory.component';
import { generateSlugCategoryName } from '../../util/helper';
const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      _id
      name
    }
  }
`;

const ProductCategoryContainer = ({ categorySlug = '' }) => {
  const { data, loading, error } = useQuery(LIST_CATEGORIES);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>We have an error...</p>;
  }

  const { listCategories } = data;
  console.log(`current category slug: ${categorySlug}`);
  const currentCategoryId =
    listCategories.find((item) => {
      const slugName = generateSlugCategoryName(item.name);
      console.log(slugName, categorySlug.toLowerCase());
      return slugName.toLowerCase() === categorySlug?.toLowerCase();
    })?._id || '';
  console.log(`We found the id based on slug: ${currentCategoryId}`);
  return (
    <ProductCategory
      currentCategoryId={currentCategoryId}
      categories={listCategories}
    />
  );
};

export default ProductCategoryContainer;
