import React from 'react';
import { withRouter } from 'react-router-dom';
import { getIconImage, mapCategory } from '../../util/helper';
import { useTranslation } from 'react-i18next';
const Widget = (props) => {
  const { categories, history } = props;
  const { t } = useTranslation('common');
  const acceptableList = ['Hàng Lon', 'Giải Khát', 'Ăn Liền', 'Gia Vị'];
  const renderIconHelper = () => {
    if (categories) {
      const result = [];
      for (let i = 0; i < categories.length; i++) {
        let name = categories[i].name;
        let obj = {};
        switch (name) {
          case 'Hàng Lon':
            obj = {
              icon: getIconImage('hang-lon'),
              text: t(mapCategory('Hàng Lon')),
              id: categories[i]._id,
            };
            result.push(obj);
            break;
          case 'Giải Khát':
            obj = {
              icon: getIconImage('giai-khat'),
              text: t(mapCategory('Giải Khát')),
              id: categories[i]._id,
            };
            result.push(obj);
            break;
          case 'Ăn Liền':
            obj = {
              icon: getIconImage('an-lien'),
              text: t(mapCategory('ăn liền')),
              id: categories[i]._id,
            };
            result.push(obj);
            break;
          case 'Gia Vị':
            obj = {
              icon: getIconImage('gia-vi'),
              text: t(mapCategory('Gia Vị')),
              id: categories[i]._id,
            };
            result.push(obj);
            break;
          case 'Hàng Lạnh':
            obj = {
              icon: getIconImage('hang-lanh'),
              text: t(mapCategory('Hàng Lạnh')),
              id: categories[i]._id,
            };
            result.push(obj);
            break;
          case 'Hàng Khô':
            obj = {
              icon: getIconImage('hang-kho'),
              text: t(mapCategory('Hàng Khô')),
              id: categories[i]._id,
            };
            result.push(obj);
            break;
          case 'Tiệt Trùng':
            obj = {
              icon: getIconImage('tiet-trung'),
              text: t(mapCategory('Tiệt Trùng')),
              id: categories[i]._id,
            };
            result.push(obj);
            break;
          default:
            break;
        }
      }
      return result;
    }
  };
  const handleClick = (id) => {
    // console.log(id)
    history.push(`/products/${id}`);
  };
  const renderWidget = () => {
    const data = renderIconHelper();
    //  console.log(data)
    const widgetData = [
      {
        icon: <i className="fas fa-prescription-bottle" />,
        text: 'Hàng Lon',
      },
      {
        icon: <i className="fas fa-cocktail" />,
        text: 'Giải Khát',
      },
      {
        icon: <i className="fas fa-hamburger" />,
        text: 'Ăn Liền',
      },
      {
        icon: <i className="fas fa-mortar-pestle" />,
        text: 'Gia Vị',
      },
    ];
    return data.map((w, idx) => {
      return (
        <div
          key={idx}
          className="widget"
          onClick={() => {
            handleClick(w.id);
          }}
        >
          {/* <img className="widget__image" src={w.img} alt={`Widget ${idx + 1}`} /> */}

          <div className="widget__content">
            <div className="widget__content--icon">
              <img src={w.icon} alt="aulac-icon" />
            </div>
            <div className="widget__content--text">{w.text}</div>
          </div>
        </div>
      );
    });
  };
  return <div className={`widget__container`}>{renderWidget()}</div>;
};

export default withRouter(Widget);
