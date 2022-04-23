import { GET_NEWS_BY_SLUG } from '../../lib/graphql/queries';
import { initializeApollo } from '../../lib/apollo';
import NewDetail from '../../containers/News/Detail/NewsDetail';
import CustomHead from '../../components/CustomHead';

const NewDetailPage = (props) => {
  const { title, cover } = props.blog;
  return (
    <>
      <CustomHead title={title} image={cover} />
      <NewDetail data={props.blog} />
    </>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { slug },
  } = context;
  const apolloClient = initializeApollo();
  const payload = {
    query: GET_NEWS_BY_SLUG,
    variables: {
      slug,
    },
  };
  let blog;
  try {
    await apolloClient.query(payload);
    const { getNewsBySlug } = apolloClient.cache.readQuery(payload);
    blog = getNewsBySlug || null;
  } catch (e) {
    console.log('We have an error when fetching News Detail');
    console.log(e);
  }
  return {
    props: {
      blog,
    },
  };
}

export default NewDetailPage;
