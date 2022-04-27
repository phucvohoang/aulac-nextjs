import { GET_RECEIPT_BY_SLUG, LIST_FOOD_RECEIPT } from '../../lib/graphql/queries';
import { initializeApollo } from '../../lib/apollo';
import ReceiptDetail from '../../containers/Receipt/Detail/ReceiptDetail.component';
import CustomHead from '../../components/CustomHead';
import { useRouter } from 'next/router';

const NewDetailPage = (props) => {
  const { title = '', cover = '' } = props?.blog || { };
  const router = useRouter()
  if (router.isFallback) {
    return <p>Loading...</p>
  }
  return (
    <>
      <CustomHead title={title} image={cover} />
      <ReceiptDetail data={props.blog} />
    </>
  );
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  console.log('==== getStaticPaths ====')
  const payload = {
    query: LIST_FOOD_RECEIPT,
    variables: {
      page: 1,
      perPage: 9999
    }
  }
  let result = {
    paths: [],
    fallback: true
  }
  try {
    await apolloClient.query(payload)
    const { listFoodReceipt: data} = apolloClient.cache.readQuery(payload)
    // console.log(data)
    if (!data){
      console.log('we not found data')
    }
    // console.log(data.docs)
    const paths = (data?.docs || []).map(item => {
      // console.log(item)
      return {
        params: { slug: item.slug }
      }
    })
    console.log(paths)
    result.paths = paths
  } catch (e) {
    console.log('we found error in this reciept path')
    console.log(e)
  }
  console.log('Payload return from StaticPaths')
  console.log(result)
  return result
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;
  if (!slug) {
    return {
      notFound: true
    }
  }
  const apolloClient = initializeApollo();
  const payload = {
    query: GET_RECEIPT_BY_SLUG,
    variables: {
      slug,
    },
  };
  let blog;
  try {
    await apolloClient.query(payload);
    const { getFoodReceiptBySlug } = apolloClient.cache.readQuery(payload);
    blog = getFoodReceiptBySlug || null;
  } catch (e) {
    console.log('We have an error when fetching Receipt Detail');
    console.log(e);
  }
  return {
    props: {
      blog,
    },
  };
}

export default NewDetailPage;
