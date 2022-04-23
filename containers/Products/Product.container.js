import { useQuery, useReactiveVar } from '@apollo/client';
import Product from './Products';
import { LIST_CATEGORIES } from '../../lib/graphql/queries';
import { regionVar } from '../../lib/graphql/cache';
import { Spin } from 'antd';
const ProductContainer = (props) => {
  const region = useReactiveVar(regionVar);

  const { data, loading, error } = useQuery(LIST_CATEGORIES);
  if (loading) return <Spin />;
  if (error) return <Spin />;
  const listCategories = data.listCategories;
  return <Product region={region} {...props} categories={listCategories} />;
};

export default ProductContainer;
