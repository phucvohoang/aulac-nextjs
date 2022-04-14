import React from 'react';
import { withRouter } from 'react-router-dom';
import secondBannerImgTopRight from '../../assets/home/background/bg-home-slide2_3.png';
import secondBannerImgCenter from '../../assets/home/background/bg-home-slide2_1.png';
import secondBannerImgBottom from '../../assets/home/background/bg-home-slide2_2.png';
import { useTranslation } from 'react-i18next';
import bannerHome from '../../assets/banners/banner-home.jpg';
const HomeImageSlider = (props) => {
  const { history, categories, settingHome } = props;
  const { t } = useTranslation('common');
  // console.log(settingHome)
  const handleButtonClick = () => {
    if (categories) {
      const _id = categories[0]._id;
      // console.log(history)
      history.push(`/products/${_id}`);
    }
  };
  const { title, subTitle, buttonText } = settingHome;
  return (
    <div className="banner">
      {/* <div className="banner__first">
                <div className="banner__content">
                    <div className="banner__content--delivery">
                        <h4>Delivery in 24h</h4>
                    </div>
                    <div className="banner__content--title">
                        <h1>
                            <span>Organic Food </span>
                            <span>Everyday</span>
                        </h1>
                    </div>
                    <div className="banner__content--paragraph">
                        <p>Order today and recieve your packages tomorrow by efway</p>
                    </div>
                    <div className="banner__content--button">
                        <button>PURCHASE NOW</button>
                    </div>
                </div>
                <div className="banner__img__top-left">
                    <img src={firstBannerTopLeftImage} alt='Top Left'/>
                </div>
                <div className="banner__img__top-right">
                    <img src={firstBannerTopRightImage} alt="Top Right"/>
                </div>
                <div className="banner__img__bot-left">
                    <img src={firstBannerBotLeftImage} alt="Bottom Left"/>
                </div>
                <div className="banner__img--main">
                    <img src={firstBannerMainImage} alt="Main"/>
                </div>
            </div> */}
      <div
        className="banner__second"
        style={{ backgroundImage: `url("${bannerHome}")` }}
      >
        <div className="banner__content">
          {/* <div className="banner__content--delivery">
                        <h4>Delivery in 24h</h4>
                    </div> */}
          <div className="banner__content--title">
            <h1>
              <span>{title ? title : 'Thực Phẩm Chay'} </span>
              {/* <span>Mỗi Ngày</span> */}
            </h1>
          </div>
          <div className="banner__content--paragraph">
            <p>
              {subTitle ? subTitle : 'Đặt hàng hôm nay, nhận hàng vào ngày mai'}
            </p>
          </div>
          <div className="banner__content--button">
            <button onClick={handleButtonClick}>
              {buttonText ? buttonText : t('buyNow')}
            </button>
          </div>
        </div>
        {/* <div className="banner__img__top-right">
          <img src={secondBannerImgTopRight} alt="Top Right" />
        </div>
        <div className="banner__img__center">
          <img src={secondBannerImgCenter} alt="Center" />
        </div>
        <div className="banner__img__bottom">
          <img src={secondBannerImgBottom} alt="Bottom" />
        </div> */}
      </div>

      {/* <div className="banner__action">
                <span
                    className="banner__action__btn selected__btn first__btn--click"
                    onClick={(e) => btnSlideActionClick(e)}
                >
                    <i className="fas fa-circle first__btn--click"/>
                </span>
                <span
                    className="banner__action__btn second__btn--click"
                    onClick={(e) => btnSlideActionClick(e)}
                >
                    <i className="fas fa-circle second__btn--click"/>
                </span>
            </div> */}
    </div>
  );
};

export default withRouter(HomeImageSlider);
