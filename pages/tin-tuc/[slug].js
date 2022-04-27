import { GET_NEWS_BY_SLUG } from '../../lib/graphql/queries';
import { initializeApollo } from '../../lib/apollo';
import NewDetail from '../../containers/News/Detail/NewsDetail';
import CustomHead from '../../components/CustomHead';
import { LIST_NEWS } from '../../lib/graphql/queries'
import { useRouter } from 'next/router';
const NewDetailPage = (props) => {
  const { title = '', cover = '' } = props.blog || {};
  const router = useRouter()
  if (router.isFallback) {
    return <p>Loading....</p>
  }
  return (
    <>
      <CustomHead title={title} image={cover} />
      <NewDetail data={props.blog} />
    </>
  );
};
export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  console.log('==== getStaticPaths ====')
  const payload = {
    query: LIST_NEWS,
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
    const { listNews: data} = apolloClient.cache.readQuery(payload)
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
