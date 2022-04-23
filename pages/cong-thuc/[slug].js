import { GET_RECEIPT_BY_SLUG } from '../../lib/graphql/queries';
import { initializeApollo } from '../../lib/apollo';
import ReceiptDetail from '../../containers/Receipt/Detail/ReceiptDetail.component';
import CustomHead from '../../components/CustomHead';

const NewDetailPage = (props) => {
  const { title, cover } = props.blog;
  return (
    <>
      <CustomHead title={title} image={cover} />
      <ReceiptDetail data={props.blog} />
    </>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { slug },
  } = context;
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
