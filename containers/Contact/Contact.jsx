import React from 'react';
import ProductsHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import useTranslation from 'next-translate/useTranslation';
const Contact = (props) => {
  const { t } = useTranslation('common');
  return (
    <div className="news__container">
      <div className="news__header">
        <ProductsHeader title={t('header.about')} />
      </div>
      <div className="about">
        <h2 className="heading">{t('aboutpage.title')}</h2>
        <div className="about__wrapper">
          <div className="left__content">
            <p>{t('aboutpage.header')}</p>
            <ol>
              <li> {t('footer.productCol.beverage')}</li>
              <li> {t('footer.productCol.frozen')}</li>
              <li> {t('footer.productCol.can')}</li>
              <li> {t('footer.productCol.dried')}</li>
              <li> {t('footer.productCol.pasteurized')}</li>
              <li> {t('footer.productCol.readyToEat')}</li>
              <li> {t('footer.productCol.spices')}</li>
            </ol>
            <p>
              <p>{t('aboutpage.footer')}</p>
            </p>
          </div>
          <div className="right__content">
            <div className="image__block">
              <img
                src="https://aulac-vegetarian.com/wp-content/uploads/2020/09/thuc-pham-chay-au-lac-01.jpg"
                alt="Au-Lac-Team"
              />
            </div>

            <div className="image__block">
              <img
                src="https://aulac-vegetarian.com/wp-content/uploads/2020/08/gioi-thieu-2.jpg"
                alt="Au-Lac-Team"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
