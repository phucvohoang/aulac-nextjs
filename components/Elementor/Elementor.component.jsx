// import React from 'react';
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation';

const leftImg = '/assets/home/background/bg-home-widget-article_1.jpg';
const rightTopImg = '/assets/home/background/bg-home-widget-article_2.jpg';
const rightBotImg = '/assets/home/background/bg-home-widget-article_3.jpg';
// import useTranslation from 'next-translate/useTranslation';
// const leftImg = "http://demo2.themelexus.com/efway/wp-content/uploads/2020/07/h2-banner04.jpg";
// const rightTopImg = "http://demo2.themelexus.com/efway/wp-content/uploads/2020/07/h1-banner01.jpg";
// const rightBotImg = "http://demo2.themelexus.com/efway/wp-content/uploads/2020/07/h2-banner05.jpg";
const Elementor = (props) => {
  const { t } = useTranslation('common');
  const router = useRouter()
  return (
    <div className="elementor">
      <div className="elementor__left">
        <div className="elementor__left--img">
          <img className="img-bg-elementor" src={leftImg} alt="Left" />
        </div>
        <div className="elementor__left--text">
          <div className="elementor__title">
            <h1 style={{ color: '#fff' }}>Flash Sale</h1>
          </div>
          <div className="elementor__paragraph">
            <p>{t('flashSaleDes')}</p>
          </div>
          <div className="elementor__btn">
            <button
              onClick={() => {
                router.push('/flashsale');
              }}
            >
              {t('seeAll')}
            </button>
          </div>
        </div>
      </div>
      <div className="elementor__right">
        <div className="elementor__right--top">
          <div className="elementor__right__top--img">
            <img
              className="img-bg-elementor"
              src={rightTopImg}
              alt="Right Top"
            />
          </div>
          <div className="elementor__right__top--text">
            <div className="elementor__title">
              <h1>{t('header.recipe')}</h1>
              <h1>Các món ăn</h1>
            </div>
            <div className="elementor__paragraph">
              <p>{t('recipeDes')}</p>
            </div>
            <div className="elementor__btn">
              <button
                onClick={() => {
                  router.push('/recipes');
                }}
              >
                {t('seeAll')}
              </button>
            </div>
          </div>
        </div>
        <div className="elementor__right--bot">
          <div className="elementor__right__bot--img">
            <img
              src={rightBotImg}
              className="img-bg-elementor"
              alt="Right Bot"
            />
          </div>
          <div className="elementor__right__bot--text">
            <div className="elementor__title">
              <h1 style={{ color: '#fff' }}>{t('header.news')}</h1>
            </div>
            <div className="elementor__paragraph">
              <p style={{ width: '60%' }}>{t('newsDes')}</p>
            </div>
            <div className="elementor__btn">
              <button
                onClick={() => {
                  router.push('/news');
                }}
              >
                {t('seeAll')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elementor;
