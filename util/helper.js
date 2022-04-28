const iconAnLien = '/assets/icon/icon-an-lien.webp';
const iconGiaVi = '/assets/icon/icon-gia-vi.webp';
const iconGiaiKhat = '/assets/icon/icon-giai-khat.webp';
const iconHangKho = '/assets/icon/icon-hang-kho.webp';
const iconHangLanh = '/assets/icon/icon-hang-lanh.webp';
const iconHangLon = '/assets/icon/icon-hang-lon.webp';
const iconTietTrung = '/assets/icon/icon-tiet-trung.webp';

const bannerAnLien = '/assets/banners/an-lien/an-lien-desk.webp';
const bannerGiaVi = '/assets/banners/gia-vi/gia-vi-desk.webp';
const bannerGiaiKhat = '/assets/banners/giai-khat/giai-khat-desk.webp';
const bannerHangKho = '/assets/banners/hang-kho/hang-kho-desk.webp';
const bannerHangLanh = '/assets/banners/hang-lanh/hang-lanh-desk.webp';
const bannerHangLon = '/assets/banners/hang-lon/hang-lon-desk.webp';
const bannerTietTrung = '/assets/banners/tiet-trung/tiet-trung-desk.webp';

export const getIconImage = (slugName) => {
  switch (slugName) {
    case 'an-lien':
      return iconAnLien;
    case 'hang-lanh':
      return iconHangLanh;
    case 'gia-vi':
      return iconGiaVi;
    case 'giai-khat':
      return iconGiaiKhat;
    case 'hang-kho':
      return iconHangKho;
    case 'hang-lon':
      return iconHangLon;
    case 'tiet-trung':
      return iconTietTrung;
  }
};
export const getBanner = (slugName) => {
  switch (slugName) {
    case 'an-lien':
      return bannerAnLien;
    case 'hang-lanh':
      return bannerHangLanh;
    case 'gia-vi':
      return bannerGiaVi;
    case 'giai-khat':
      return bannerGiaiKhat;
    case 'hang-kho':
      return bannerHangKho;
    case 'hang-lon':
      return bannerHangLon;
    case 'tiet-trung':
      return bannerTietTrung;
  }
};

export const addCommas = (nStr) => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
};

const renderItemList = (data) => {
  let res = '';
  for (let i = 0; i < data.items.length; i++) {
    res += `<li>${data.items[i]}</li>`;
  }
  // console.log(res)
  return res;
};
export const convertDataEditorToHTML = (content) => {
  let res = '';
  for (let i = 0; i < content.length; i++) {
    const section = content[i];
    const { type, data } = section;
    switch (type) {
      case 'header':
        res += `<h2 className="article__heading">${data.text}</h2>`;
      case 'paragraph':
        res += `<p style='margin-bottom: 1rem; text-align: left' className="article__paragraph">${data.text}</p>`;
        break;
      case 'image':
        res += `<div className="article__body__image">
                    <img src="${data.file?.url}" alt="product image" />
                </div>`;
        break;
      case 'embed':
        res += `<div className="article__body__embed">
                <iframe width="100%" height="500" src="${data.embed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`;
        break;
      case 'list':
        // console.log(data)
        res += `<div className="article__body__list" style='padding: 1rem 4rem'>
                    <ol>
                        ${renderItemList(data)}
                    </ol>
            </div>`;
        break;
      default:
        break;
    }
  }
  return res;
};
export const getViewdProduct = () => {
  const data = localStorage.getItem('viewedProduct');
  if (data) {
    const products = JSON.parse(data);
    return products;
  } else {
    return [];
  }
};

export const addViewedProduct = (product) => {
  const data = localStorage.getItem('viewedProduct');
  let list = [];
  if (data) {
    const products = JSON.parse(data);
    const isExisted = products.findIndex((item) => item._id === product._id);
    if (isExisted === -1) {
      if (products.length < 3) {
        list = [product, ...products];
        localStorage.setItem('viewedProduct', JSON.stringify(list));
      } else {
        list = [product, products[1], products[2]];
        localStorage.setItem('viewedProduct', JSON.stringify(list));
      }
    }
  } else {
    list = [product];
    localStorage.setItem('viewedProduct', JSON.stringify(list));
  }
};
export const checkAuth = () => {
  if (typeof window === 'undefined')
    return { isLoggedIn: false, currentUser: null };
  const data = localStorage.getItem('currentUser');
  // console.log(data)
  let isLoggedIn = false;
  let currentUser = {};
  if (data) {
    currentUser = JSON.parse(data);
    isLoggedIn = Object.keys(currentUser).length > 0;
  }
  return { isLoggedIn, currentUser };
};
export const convertAdress = (address) => {
  if (address) {
    const { addressNo, city, district, ward } = address;
    return `${addressNo}/${ward.name}/${district.name}/${city.name}`;
  }
  return '';
};
export const convertOldAddress = (address) => {
  if (address) {
    const { addressNo } = address;
    let splitArr;
    if (addressNo.includes('/')) {
      splitArr = addressNo.split('/');
    }
    if (addressNo.includes(',')) {
      splitArr = addressNo.split(',');
    }
    return splitArr[splitArr.length - 2];
  }
};
export const isSameCity = (cityForShipping, region) => {
  const { selectedBrand: { address: { city: { name = '' } = {} } = {} } = {} } =
    region;
  let normalizeCity = name.trim().toLowerCase().replace(' city', '');
  return normalizeCity === cityForShipping.toLowerCase();
};
export const convertCartToRequestBody = (cartItems) => {
  // const { cartItems } = this.props;

  const cart = cartItems ? Object.keys(cartItems) : [];
  const details = [];
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      details.push({
        product: cart[i],
        quantity: cartItems[cart[i]].quantity,
      });
    }
  }
  return details;
};
export const getRoomName = (customerId = '', driverId = '') => {
  // console.log(customerId);
  // console.log(driverId);
  const sorted =
    customerId.localeCompare(driverId) === -1 ||
    customerId.localeCompare(driverId) === 0;
  // console.log(sorted);
  return sorted ? `${customerId}-${driverId}` : `${driverId}-${customerId}`;
};

export const cleanUndefinedProperty = (obj) => {
  let cleanedObject = { ...obj };
  const keyIsUndefined = Object.keys(obj).filter((key) => !obj[key]);
  keyIsUndefined.forEach((key) => {
    cleanedObject[key] = 'empty';
  });
  return cleanedObject;
};

export const normalizeGroupName = (groupName = '') => {
  const name = groupName.replaceAll('--', ' ').split('-')[1];
  return name;
};

export const fetchingCityFromLatLng = (address) => {
  const H = window?.H;
  if (!H) {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  const platform = new H.service.Platform({
    apikey: 'YG4udLo3VPNVG8fDAmwoXhs1JEDbsKPCyizbDvjIYQc',
  });
  const service = platform.getSearchService();
  return new Promise((resolve, reject) => {
    service.reverseGeocode(
      {
        // at: '106.6462118714261,10.766158845922476',
        // at: '10.766158845922476,106.6462118714261',
        at: `${address.latitude},${address.longitude}`,
      },
      (result) => {
        const item = result.items[0];
        if (!result?.items[0]) {
          reject(null);
        }
        // const { title = 'missing', id = 'missing' } = result.items?.[0];
        // updateAddressOnState(result.items[0]?.title);
        // const { addressNo, city } = this.convertAddress(item);
        const { county } = item.address;
        if (county) {
          resolve(county);
        } else {
          reject(null);
        }
      }
    );
  });
};
export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const mapCategory = (category = '') => {
  let text = category.trim().toLowerCase();
  switch (text) {
    case 'giải khát':
      return 'beverage';
    case 'hàng lạnh':
      return 'frozen';
    case 'hàng lon':
      return 'can';
    case 'hàng khô':
      return 'dried';
    case 'tiệt trùng':
      return 'pasteurized';
    case 'ăn liền':
      return 'readyToEat';
    case 'gia vị':
      return 'spices';
    default:
      return category;
  }
};

export const mapTabSection = (tab = '') => {
  const text = tab.trim().toLocaleLowerCase();
  switch (text) {
    case 'gợi ý hôm nay':
      return 'homepage.tabs.recommend';
    case 'sản phẩm bán chạy':
      return 'homepage.tabs.best';
    default:
      return text;
  }
};

const removeUnicodeChars = (str) => {
  return str
    .replace(/[aáàảãạăắằẳẵặâấầẩẫậ]/g, 'a')
    .replace(/[AÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬ]/g, 'A')
    .replace(/[eéèẻẽẹêếềểễệ]/g, 'e')
    .replace(/[EÉÈẺẼẸÊẾỀỂỄỆ]/g, 'E')
    .replace(/[iíìỉĩị]/g, 'i')
    .replace(/[IÍÌỈĨỊ]/g, 'I')
    .replace(/[oóòỏõọôốồổỗộơớờởỡợ]/g, 'o')
    .replace(/[OÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ]/g, 'O')
    .replace(/[uúùủũụưứừửữự]/g, 'u')
    .replace(/[UÚÙỦŨỤƯỨỪỬỮỰ]/g, 'U')
    .replace(/[yýỳỷỹỵ]/g, 'y')
    .replace(/[YÝỲỶỸỴ]/g, 'Y')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const generateSlugCategoryName = (categoryName) => {
  const baseSlug = removeUnicodeChars(categoryName)
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '-');
  // let slug = baseSlug;
  return baseSlug;
};

export const cleaningDescription = (s = '') => {
  const ar = [
    {
      reg: /[^(<p>)]\s?(Hướng dẫn sử dụng)(\s{0,1}):/i,
      replace: '<br /> <b>Hướng dẫn sử dụng:</b>',
    },
    {
      reg: /[^(<p>)]\s?(Chú ý)(\s{0,1}):/i,
      replace: '<br /> <b>Chú ý:</b>',
    },
    {
      reg: /[^(<p>)]\s?(INGREDIENTS)(\s{0,1}):/i,
      replace: '<br /> <b>INGREDIENTS:</b>',
    },
    {
      reg: /[^(<p>)]\s?(USAGES)(\s{0,1}):/i,
      replace: '<br /> <b>USAGES:</b>',
    },
    {
      reg: /[^(<p>)]\s?(STORAGE)(\s{0,1}):/i,
      replace: '<br /> <b>STORAGE:</b>',
    },
    {
      reg: /[^(<p>)]\s?(PRODUCT CONTAINS)(\s{0,1}):/i,
      replace: '<br /> <b>PRODUCT CONTAINS:</b>',
    },
    {
      reg: /[^(<p>)]\s?(THÀNH PHẦN)(\s{0,1}):/i,
      replace: '<br /> <b>THÀNH PHẦN:</b>',
    },
    {
      reg: /[^(<p>)]\s?(HƯỚNG DẪN BẢO QUẢN)(\s{0,1}):/i,
      replace: '<br /> <b>HƯỚNG DẪN BẢO QUẢN:</b>',
    },
    {
      reg: /[^(<p>)]\s?(CÁCH SỬ DỤNG:)(\s{0,1}):/i,
      replace: '<br /> <b>CÁCH SỬ DỤNG::</b>',
    },
  ];

  for (let i = 0; i < ar.length; i++) {
    s = s.replace(ar[i].reg, ar[i].replace);
  }
  return s;
};
