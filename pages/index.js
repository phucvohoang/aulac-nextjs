import React from 'react';
import Head from 'next/head';
import HomeSlider from '../components/HomeSlider/HomeSlider.container';
import ProductOverviewContainer from '../components/ProductOverview/ProductOverview.container.js';
import Elementor from '../components/Elementor/Elementor.component.jsx';
import Widget from '../components/Widget/Widget.component.jsx';
// import { withTranslation } from 'react-i18next';
import WrapperTranslate from '../components/WrapperTranslate/WrapperTranslate';
import { mapCategory } from '../util/helper';
import BannerContainer from '../components/Banner';
import { LIST_CATEGORIES, LIST_SALE_REGIONS } from '../lib/graphql/queries';
import { initializeApollo } from '../lib/apollo';
import ClientOnly from '../components/Wrapper/fetchingClient';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  componentDidMount() {
    const { categories } = this.props;
    console.log('im categories');
    console.log(categories);
    // //console.log('on did mount')
    // //console.log(categories)
    this.setState(() => {
      return {
        category: categories[0],
      };
    });
  }

  renderSections = (category) => {
    const { region } = this.props;
    // //console.log(category)
    if (category && region) {
      return (
        <ProductOverviewContainer
          region={region}
          key={category._id}
          category={category}
        />
      );
    }
  };

  renderCategory = () => {
    const { category } = this.state;
    if (category) {
      if (this.props.categories.length > 4) {
        const subCategory = this.props.categories.slice(0, 4);
        ////console.log(this.state.category)
        return subCategory.map((item, idx) => {
          ////console.log(this.state.item._id)
          return (
            <p
              className={category._id === item._id ? 'active' : ''}
              onClick={() => {
                this.setState(() => ({ category: item }));
              }}
              key={idx}
            >
              {/* {item.name} */}
              {this.props.t(mapCategory(item.name))}
            </p>
          );
        });
      } else {
      }
    }
  };
  render() {
    console.log(this.props.regions);
    return (
      <section className="container">
        <Head>
          <title>Au Lac Shop</title>
          <meta
            name="description"
            content="This is a Website of Au Lac Company"
          />
        </Head>
        <HomeSlider categories={this.props.categories} />
        {/* <ClientOnly>
          <HomeSlider categories={this.props.categories} />
        </ClientOnly> */}
        <Widget categories={this.props.categories} />
        <BannerContainer isCenter={true} />
        <ClientOnly>
          <ProductOverviewContainer region={this.props.region} />
        </ClientOnly>
        <div style={{ paddingBottom: '40px' }}>
          <BannerContainer isCenter={true} />
        </div>
        <Elementor />
      </section>
    );
  }
}

export default WrapperTranslate(Home);

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  let listCategories = [];
  let regions = [];
  try {
    const query1 = apolloClient.query({
      query: LIST_CATEGORIES,
    });
    const query2 = apolloClient.query({
      query: LIST_SALE_REGIONS,
    });
    const { listCategories: data } = apolloClient.cache.readQuery({
      query: LIST_CATEGORIES,
    });
    const { listSaleRegions: regionsData } = apolloClient.cache.readQuery({
      query: LIST_SALE_REGIONS,
    });
    await Promise.all([query1, query2]);
    regions = regionsData;
    listCategories = data;
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      categories: listCategories,
      regions: regions,
    },
  };
};
