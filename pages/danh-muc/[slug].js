import Products from '../../containers/Products/Product.container';
import ClientOnly from '../../components/Wrapper/fetchingClient.js';
import { useRouter } from 'next/router';
import CustomHead from '../../components/CustomHead';

const ProductPage = () => {
  // console.log(props.match.params.cateId)
  const router = useRouter();
  const { slug } = router.query;
  return (
    <ClientOnly>
      <CustomHead title="Au Lac | Danh Mục" />
      <Products slug={slug} />
    </ClientOnly>
  );
};

export default ProductPage;
