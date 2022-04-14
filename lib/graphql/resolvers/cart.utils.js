export const addItemToCart = (cartItems, cartItemToAdd) => {
  return {
    ...cartItems,
    [cartItemToAdd._id]: {
      ...cartItemToAdd,
      quantity: cartItemToAdd.quantity > 1 ? cartItemToAdd.quantity : 1,
    },
  };
};
export const addItemToWishList = (wishListItems, itemToAdd) => {
  return {
    ...wishListItems,
    [itemToAdd._id]: {
      ...itemToAdd,
    },
  };
};
export const removeItemFromWishList = (wishListItems, itemToRemove) => {
  const newWishListItems = { ...wishListItems };
  delete newWishListItems[itemToRemove._id];
  return newWishListItems;
};
export const updateItemOnCart = (cartItems, cartItemToAdd) => {
  return {
    ...cartItems,
    [cartItemToAdd._id]: {
      ...cartItems[cartItemToAdd._id],
      quantity: cartItemToAdd.quantity,
    },
  };
};
export const removeItemFromCart = (cartItems = {}, cartItemToRemove) => {
  const cart = Object.keys(cartItems);
  let result = {};
  cart.forEach((key) => {
    if (key !== cartItemToRemove._id) {
      result[key] = cartItems[key];
    }
  });
  return result;
};

export const getCartItemCount = (cartItems = {}) => {
  const cart = Object.keys(cartItems);
  if (cart.length > 0) {
    return cart.reduce((accum, next) => {
      return (accum = accum + cartItems[next].quantity);
    }, 0);
  } else {
    return 0;
  }
};

export const getCartTotal = (cartItems = {}) => {
  const cart = Object.keys(cartItems);
  if (cart.length > 0) {
    return cart.reduce((accum, next) => {
      return (accum = accum + cartItems[next].quantity * cartItems[next].price);
    }, 0);
  } else {
    return 0;
  }
};

export const clearItemFromCart = (cartItems, item) =>
  cartItems.filter((cartItem) => cartItem._id !== item._id);
