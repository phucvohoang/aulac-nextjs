import { InMemoryCache, makeVar } from '@apollo/client';
import { getItem } from '../../util/localStorage';

export const DEFAULT_DATA_CHECKOUT = {
  checkoutData: {
    checkout: null,
    ['step-1']: null,
    ['step-2']: null,
    ['step-3']: null,
  },
  currentStep: 1,
};
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isShowPopChat: {
          read() {
            return isShowPopChatVar();
          },
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        currentUser: {
          read() {
            return currentUserVar();
          },
        },
        region: {
          read() {
            return regionVar();
          },
        },
        wishList: {
          read() {
            return wishListVar();
          },
        },
        lastMsg: {
          read() {
            return lastMsgVar();
          },
        },
      },
    },
  },
});
export const languageVar = makeVar(
  getItem('language') ? getItem('language') : 'vn'
);
export const isLoggedInVar = makeVar(getItem('isLoggedIn') ? true : false);
export const isShowPopChatVar = makeVar(getItem('showPopChat') ? true : false);
export const currentUserVar = makeVar(
  getItem('currentUser') ? getItem('currentUser') : {}
);
export const cartItemsVar = makeVar(
  getItem('cartItems') ? getItem('cartItems') : {}
);
export const regionVar = makeVar(getItem('region') ? getItem('region') : null);
export const wishListVar = makeVar(
  getItem('wishList') ? getItem('wishList') : {}
);
export const lastMsgVar = makeVar(
  getItem('lastMsg') ? getItem('lastMsg') : null
);
export const checkoutDataVar = makeVar(
  getItem('checkoutData')
    ? getItem('checkoutData')
    : {
        checkoutData: {
          checkout: null,
          ['step-1']: null,
          ['step-2']: null,
          ['step-3']: null,
        },
        currentStep: 1,
      }
);
