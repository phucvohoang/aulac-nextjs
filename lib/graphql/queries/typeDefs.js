import { gql } from '@apollo/client';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Product]!
    currentUser: User
    region: Region
    wishList: [Product]!
  }
  extend type AddressInputV2 {
    addressNo: String!
    latitude: Float!
    longitude: Float!
    isPrimary: Boolean
  }
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
    deviceToken: String
    isFromWeb: Boolean
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
`;

export default typeDefs;
