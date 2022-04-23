import Products from '../../containers/Products/Product.container';
import ClientOnly from '../../components/Wrapper/fetchingClient.js';
import { useRouter } from 'next/router';

const ProductPage = () => {
  // console.log(props.match.params.cateId)
  const router = useRouter();
  const { slug } = router.query;
  return (
    <ClientOnly>
      <Products slug={slug} />
    </ClientOnly>
  );
};

export default ProductPage;
