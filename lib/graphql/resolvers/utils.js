import {
  isLoggedInVar,
  currentUserVar,
  regionVar,
  cartItemsVar,
  wishListVar,
  isShowPopChatVar,
  checkoutDataVar,
  DEFAULT_DATA_CHECKOUT,
  languageVar,
} from "../cache";
import { setItem, removeItem } from "../../util/localStorage";
import {
  addItemToCart,
  addItemToWishList,
  removeItemFromCart,
  removeItemFromWishList,
  updateItemOnCart,
} from "./cart.utils";
const setStaticPrice = (_id, salePrice) => {
  let result = 0;
  switch (_id) {
    case "5faa75e53452561a3f6463cf":
      result = salePrice;
      break;
    case "5faa75e53452561a3f6463d0":
      result = salePrice + (salePrice * 5) / 100;
      break;
    case "5faa75e53452561a3f6463d1":
      result = salePrice + (salePrice * 7) / 100;
      break;
    default:
      result = salePrice;
      break;
  }
  return result;
};
export const transformProductObject = (product, region) => {
  let { salePriceInRegions, salePrice } = product;
  let customObject = {
    ...product,
  };
  if (salePriceInRegions.length === 0) {
    const { _id } = region;
    customObject.salePrice = setStaticPrice(_id, salePrice);
    return customObject;
  } else {
    console.log("================ In Else =================");

    const { _id } = region;
    console.log(_id);
    const found = salePriceInRegions.find(
      (region) => region.saleRegion._id === _id
    );
    if (found) {
      console.log("================ Found =================");
      console.log(found);
      customObject.salePrice = found.salePrice;
    } else {
      customObject.salePrice = setStaticPrice(_id, salePrice);
    }
    return customObject;
  }
};
const setDefaultAll = () => {
  isLoggedInVar(false);
  currentUserVar({});
  regionVar(null);
  cartItemsVar({});
  wishListVar({});
  isShowPopChatVar(false);
};
export const initWishList = (list) => {
  const res = {};
  for (let i = 0; i < list.length; i++) {
    res[list[i]._id] = list[i];
  }
  setItem("wishList", res);
  wishListVar(res);
};
export const addItemWishList = (item) => {
  const newData = addItemToWishList(wishListVar(), item);
  setItem("wishList", newData);
  wishListVar(newData);
};
export const removeItemWishList = (item) => {
  const newData = removeItemFromWishList(wishListVar(), item);
  setItem("wishList", newData);
  wishListVar(newData);
};
export const handleSetLoggedInState = (user) => {
  setItem("isLoggedIn", true);
  setItem("currentUser", user);
  isLoggedInVar(true);
  currentUserVar(user);
};

export const handleSetLogOutState = () => {
  // removeItem('isLoggedIn');
  // removeItem('currentUser');
  // removeItem('showPopChat');
  // removeItem('cartItems');
  // removeItem('coupon');
  // removeItem('checkoutData');
  // removeItem('currentStepCheckout');
  localStorage.clear();
  setDefaultAll();
};
export const customerUpdateProfile = (payload) => {
  const currentUser = currentUserVar(); //get current user
  const newData = { ...currentUser, ...payload };
  currentUserVar(newData);
};
export const handleSetRegion = (region) => {
  console.log('calling handleSetRegion')
  console.log(region.selectedBrand);
  const currentRegion = regionVar();
  setItem("region", region);
  regionVar(region);
  const isNewRegion = region?._id !== currentRegion?._id;
  const isChangeBranch =
    region?.selectedBrand?._id !== currentRegion?.selectedBrand?._id;
  if (isNewRegion && currentRegion) {
    cartItemsVar({});
    resetStepCheckout();
    return region;
  }
  if (isChangeBranch) {
    resetStepCheckout();
  }

  return region;
};

export const addCartItem = (item) => {
  // cartItemsVar()
  const newData = addItemToCart(cartItemsVar(), item);
  setItem("cartItems", newData);
  cartItemsVar(newData);
  resetStepCheckout();
  return newData;
};

export const removeCartItem = (item) => {
  const newData = removeItemFromCart(cartItemsVar(), item);
  setItem("cartItems", newData);
  cartItemsVar(newData);
  resetStepCheckout();
  return newData;
};
export const updateCartItem = (item) => {
  const newData = updateItemOnCart(cartItemsVar(), item);
  setItem("cartItems", newData);
  cartItemsVar(newData);
  resetStepCheckout();
  return newData;
};
export const handleCheckoutSuccess = () => {
  cartItemsVar({});
  removeItem("cartItems");
  removeItem("coupon");
  removeItem("checkoutData");
  removeItem("currentStepCheckout");
};

export const resetStepCheckout = () => {
  checkoutDataVar(DEFAULT_DATA_CHECKOUT);
  removeItem("coupon");
  removeItem("checkoutData");
  removeItem("currentStepCheckout");
};

export const showPopChat = () => {
  // console.log(`======= Preparing changing Pop chat =======`);
  isShowPopChatVar(true);
};
export const addNewAddressToUser = (address) => {
  const user = currentUserVar();
  const newUser = { ...user, address: [...user.address, address] };
  // console.log(newUser);
  currentUserVar(newUser);
};

export const checkingData = () => {
  const data = checkoutDataVar();

  const { checkoutData, currentStep } = data;
  if (currentStep > 1) {
    let termStep = currentStep;
    // const listAllStep = Object.keys(checkoutData).filter(item => item.startsWith('step-'));
    for (let i = currentStep; i > 0; i--) {
      // if data has been missed in cache
      if (!checkoutData[`step-${i}`]) {
        termStep = i;
        // break;
      }
    }
    const newData = {
      checkoutData: { ...data.checkoutData },
      currentStep: termStep,
    };
    checkoutDataVar(newData);
    return newData;
  }
  return data;
};

export const backToLastStep = () => {
  const data = checkoutDataVar();
  // setItem('currentStepCheckout', step - 1);
  const newData = {
    ...data,
    currentStep: data.currentStep === 1 ? 1 : data.currentStep - 1,
  };
  setItem("checkoutData", newData);
  checkoutDataVar(newData);
  return newData;
  // this.setState((prevState) => ({
  //   step: prevState.step === 1 ? 1 : prevState.step - 1,
  // }));
};

export const fowardToNextStep = (dataAtStep) => {
  /*
    Idea: 
      - when user click button "next" on UI -> the data that entered by user will be pass to this function
      - Get that data, update the data on the cache
      - After update, move to next step by increasing the number of currentStep and update the data to checkout property
  */
  try {
    // Get data from local cache
    let { checkoutData, currentStep } = checkoutDataVar();
    // update data of currentStep
    checkoutData[`step-${Number(currentStep)}`] = dataAtStep;
    let payload = {};
    for (let i = 1; i <= Number(currentStep); i++) {
      //console.log(`======== In for loop: ${i}`);
      payload = {
        ...checkoutData.checkout,
        ...checkoutData[`step-${Number(currentStep)}`],
      };
    }
    const newCheckoutData = { ...checkoutData, checkout: payload };
    const newData = {
      checkoutData: newCheckoutData,
      currentStep: currentStep + 1,
    };
    setItem("checkoutData", newData);
    checkoutDataVar(newData);
  } catch (e) {
    //console.log(e);
  }
};

export const switchLanguage = (lng) => {
  setItem("language", lng);
  languageVar(lng);
  window.location.reload();
};
