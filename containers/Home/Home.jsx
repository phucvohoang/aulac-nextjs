import React from 'react';
import HomeSlider from '../../components/HomeSlider/HomeSlider.container';
import ProductOverviewContainer from '../../components/ProductOverview/ProductOverview.container.js';
import Elementor from '../../components/Elementor/Elementor.component.jsx';
import Widget from '../../components/Widget/Widget.component.jsx';
// import Story from '../../components/Story/Story.component.jsx';
import Blog from '../../components/Blog/Blog.component.jsx';
import imageSample from '../../assets/blog-1.jpg';
import { withTranslation } from 'react-i18next';
import { mapCategory } from '../../util/helper';
import BannerContainer from '../../components/Banner';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
  }

  componentDidMount() {
    const { categories } = this.props;
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
    return (
      <section className="container">
        <HomeSlider categories={this.props.categories} />
        <Widget categories={this.props.categories} />
        {/* <Story /> */}
        <BannerContainer isCenter={true} />
        <ProductOverviewContainer region={this.props.region} />
        <div style={{ paddingBottom: '40px' }}>
          <BannerContainer isCenter={true} />
        </div>
        <Elementor />
      </section>
    );
  }
}

export default withTranslation('common')(Home);
