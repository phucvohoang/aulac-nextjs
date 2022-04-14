import { gql } from '@apollo/client';

import {
  addItemToWishList,
  addItemToCart,
  removeItemFromCart,
  updateItemOnCart,
  getCartTotal,
  getCartItemCount,
} from './cart.utils';

export const typeDefs = gql`
  extend type StockDetail {
    product: ID!
    quantity: Int!
    inStock: Boolean!
  }
  extend type StockDetailInput {
    product: ID!
    quantity: Int!
  }
  extend type Product {
    name: String!
    price: String!
    image: String!
    quantity: Int!
    id: String!
  }
  extend type ChatMessage {
    from: ChatPerson!
    to: ChatPerson!
    content: String!
    createdAt: Date!
    type: ChatType!
  }
  extend type ChatPerson {
    _id: ID!
    email: String!
    name: String!
  }
  extend type PreCalculateOrderSummaryRequest {
    saleRegion: ID!
    details: [SellDetailsInput!]!
    discountCode: String
    customerPoint: Int
    isRequiredVatInvoice: Boolean
  }
  extend type ChatMessageInput {
    from: ChatPerson!
    to: ChatPerson!
    content: String!
    createdAt: Date!
    type: ChatType!
  }

  extend type ChatPerson {
    _id: ID!
    email: String!
    name: String!
  }

  extend enum ChatType {
    text
    image
    product
    location
  }
  extend enum SNSProvider {
    facebook
    google
  }
  extend type RegisterInput {
    email: String!
    phone: String!
    password: String!
    name: String!
  }
  extend enum SellShippingStatus {
    ordered
    requested
    packed
    shipped
    delivered
    cancelled
  }
  extend enum PaymentMethod {
    cash
    card
    cheque
    bank_transfer
    other
  }
  extend enum DiscountType {
    fixed
    percentage
  }
  extend type CustomerUpdateProfileInput {
    name: String
    phone: String!
    companyName: String
  }
  extend type UserUpdateProfileInput {
    prefix: String
    name: String
    username: String
    phone: String
    birthday: DateTime
    gender: Gender
    identityCardNumber: String
  }
  extend type DiscountForCustomer {
    code: String!
    discountType: DiscountType!
    discountValue: Int!
    startDate: Date
    endDate: Date
    isActive: Boolean!
  }
  extend type Address {
    addressNo: String
    ward: ID!
    district: ID!
    city: ID!
    zipCode: String
    isPrimary: Boolean
  }
  extend type AddressInput {
    addressNo: String
    ward: ID!
    district: ID!
    city: ID!
    zipCode: String
    isPrimary: Boolean
  }
  extend type LoginInput {
    email: String!
    password: String!
  }
  extend type SellDetailsInput {
    product: ID!
    quantity: Int!
  }
  extend type AddressInput {
    addressNo: String
    ward: String
    district: String
    province: String
    city: String
    zipCode: String
  }
  extend type CustomerCreateOrderInput {
    branch: ID!
    saleRegion: ID!
    details: [SellDetailsInput!]!
    shippingAddress: ID!
    shippingFee: Int
    note: String
    discountCode: String
    customerPoint: Int
    isRequiredVatInvoice: Boolean
    vatInvoiceCompanyName: String
    vatInvoiceCompanyTaxCode: String
    vatInvoiceCompanyAddress: String
    totalAmountFinal: Int
    recipientName: String
    recipientPhone: String
  }
  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }
  extend type User {
    name: String!
    email: String!
    token: String!
  }
  extend type SaleRegion {
    _id: ID!
    name: String!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Product!): Boolean!
    UpdateItemOnCart(item: Product!): Boolean!
    SetCurrentUser(user: User!): User!
    UpdateUserAddress(address: AddressInput!): AddressInput!
    RemoveItemFromCart(item: Product!): [Item]!
    ClearItemFromCart(item: Item!): Boolean!
    ChooseRegion(region: SaleRegion!): Boolean!
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;
export const GET_WISHLIST = gql`
  {
    wishList @client
  }
`;
export const GET_REGION = gql`
  {
    region @client
  }
`;
const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const GET_CART_TOTAL = gql`
  {
    cartTotal @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

const updateCartItemsRelatedQueries = (cache, newCartItems) => {
  cache.writeQuery({
    query: GET_ITEM_COUNT,
    data: { itemCount: getCartItemCount(newCartItems) },
  });

  cache.writeQuery({
    query: GET_CART_TOTAL,
    data: { cartTotal: getCartTotal(newCartItems) },
  });

  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCartItems },
  });
};

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },

    AddItemToCart: (_root, { item }, { cache }) => {
      // //console.log(item)
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      // //console.log(cartItems)
      const newCart = addItemToCart(cartItems, item);
      // //console.log(newCart)
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCart,
        },
      });
      localStorage.setItem('cartItems', JSON.stringify(newCart));
    },

    RemoveItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      // //console.log(cartItems)
      // //console.log('running remove item from cart')
      // //console.log(item)
      const newCart = removeItemFromCart(cartItems, item);
      // //console.log(newCart)
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCart,
        },
      });
      localStorage.setItem('cartItems', JSON.stringify(newCart));

      //const newCartItems = removeItemFromCart(cartItems, item);

      //updateCartItemsRelatedQueries(cache, newCartItems);

      return newCart;
    },
    UpdateItemOnCart: (_root, { item }, { cache }) => {
      // //console.log("im in update item");
      // //console.log(item);
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCart = updateItemOnCart(cartItems, item);
      // //console.log(newCart);
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCart,
        },
      });
      return newCart;
    },
    ClearItemFromCart: (_root, args, { cache }) => {
      // //console.log('clear item on revolver')
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: {},
        },
      });

      return {};
    },

    SetCurrentUser: (_root, { user }, { cache }) => {
      // //console.log("im in SetCurrentUser resolvers");
      // //console.log(user)
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user },
      });
      localStorage.setItem('currentUser', JSON.stringify(user));

      return user;
    },
    UpdateUserAddress: (_root, { address }, { cache }) => {
      //console.log('=========== Address at resolver =============');
      //console.log(address);
      const { currentUser } = cache.readQuery({
        query: GET_CURRENT_USER,
      });
      const newUser = {
        ...currentUser,
        info: {
          ...currentUser.info,
          address: [...currentUser.info.address, address],
        },
      };
      //console.log(currentUser);
      //console.log(newUser);
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: newUser },
      });
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
    },

    ChooseRegion: (_root, { region }, { cache }) => {
      // //console.log("im in ChooseRegion resolvers");
      // //console.log(region)
      cache.writeQuery({
        query: GET_REGION,
        data: { region },
      });
      localStorage.setItem('region', JSON.stringify(region));
    },
    AddItemToWishList: (_root, { item }, { cache }) => {
      // //console.log(item);
      const { wishList } = cache.readQuery({
        query: GET_WISHLIST,
      });
      // //console.log(wishList);
      const newWishList = addItemToWishList(wishList, item);
      // //console.log(newWishList)
      cache.writeQuery({
        query: GET_WISHLIST,
        data: {
          wishList: newWishList,
        },
      });
      localStorage.setItem('wishList', JSON.stringify(newWishList));
    },
    InitWishList: (_root, { list }, { cache }) => {
      // //console.log(list);
      const res = {};
      for (let i = 0; i < list.length; i++) {
        res[list[i]._id] = list[i];
      }
      cache.writeQuery({
        query: GET_WISHLIST,
        data: {
          wishList: res,
        },
      });
      return res;
    },
    // Login: (_root, {email, password}, {cache}) => {
    //   //console.log(email, password)
    // }
  },
};
