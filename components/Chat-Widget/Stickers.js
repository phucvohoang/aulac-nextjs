import React from 'react';
import { Carousel, Row, Col } from 'antd';
import FeaturedIcon from 'feather-icons-react';

class Stickers extends React.Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
    this.state = {
      currentSticker: '',
    };
  }
  componentDidMount() {
    const { stickers } = this.props;
    this.setState(() => ({ currentSticker: stickers ? stickers[0].name : '' }));
  }
  next = () => {
    // //console.log('click next')
    this.carousel.next();
  };
  previous = () => {
    this.carousel.prev();
  };
  renderImageSlider = () => {
    const listStickers = this.props.stickers ? this.props.stickers : [];

    return listStickers.map((item, idx) => {
      return (
        <div
          style={{ cursor: 'pointer', width: '100%', margin: '0px 10px' }}
          onClick={() => {
            this.setState(() => ({ currentSticker: item.name }));
          }}
          key={idx}
          className="sticker-slider--item"
        >
          <img
            src={item.thumbnail}
            width="50"
            height="50"
            alt={`Product Item ${idx + 1}`}
          />
        </div>
      );
    });
  };
  renderCarousel = () => {
    return (
      <Carousel
        dots={false}
        ref={(node) => (this.carousel = node)}
        slidesPerRow={2}
      >
        {this.renderImageSlider()}
      </Carousel>
    );
  };

  sendSticker = (url) => {
    this.props.sendImage(url, 'sticker');
  };
  renderStickersSample = () => {
    let stickers = [];
    const foundSticker = this.props.stickers.findIndex(
      (item) => item.name === this.state.currentSticker
    );
    if (foundSticker > -1) {
      stickers = this.props.stickers[foundSticker].items;
      return stickers.map((item, idx) => {
        return (
          <Col
            className="sticker"
            span={8}
            key={idx}
            onClick={() => {
              this.sendSticker(item);
            }}
          >
            <img src={item} alt="sticker" />
          </Col>
        );
      });
    } else {
    }
  };
  render() {
    return (
      <div className="sticker__container">
        <Row gutter={[16, 16]} className="sticker__container--sticker">
          {this.renderStickersSample()}
        </Row>
        <div className="stickers__list">
          <div className="carousel__stickers--arrow" onClick={this.previous}>
            <FeaturedIcon icon="arrow-left" />
          </div>

          <div className="carousel__stickers">{this.renderCarousel()}</div>
          <div className="carousel__stickers--arrow" onClick={this.next}>
            <FeaturedIcon icon="arrow-right" />
          </div>
        </div>
      </div>
    );
  }
}

export default Stickers;
