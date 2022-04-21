import React from 'react';
import WrapperRouter from '../WrapperRouter/WrapperRouter';
// import secondBannerImgTopRight from '../../public/assets/home/background/bg-home-slide2_3.png';
// import secondBannerImgCenter from '../../public/assets/home/background/bg-home-slide2_1.png';
// import secondBannerImgBottom from '../../public/assets/home/background/bg-home-slide2_2.png';
// import useTranslation from 'next-translate/useTranslation';
import useTranslation from 'next-translate/useTranslation';
// import bannerHome from '../../public/assets/banners/banner-home.jpg';
const HomeImageSlider = (props) => {
  const { router, categories, settingHome } = props;
  const { t } = useTranslation('common');
  // console.log(settingHome)
  const handleButtonClick = () => {
    if (categories) {
      const _id = categories[0]._id;
      // console.log(history)
      router.push(`/products/${_id}`);
    }
  };
  const { title, subTitle, buttonText } = settingHome;
  const bannerHome = '/assets/banners/banner-home.jpg' 
  return (
    <div className="banner">
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
      </div>
    </div>
  );
};

export default WrapperRouter(HomeImageSlider);
