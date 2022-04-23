import { gql } from '@apollo/client';

// export const LIST_CATEGORIES = gql`
// query ListCategories {
//   listCategories {
//     _id
//     name
//   }
// }
// `;
export const GET_RECEIPT_BY_SLUG = gql`
  query getFoodReceiptBySlug($slug: String!) {
    getFoodReceiptBySlug(slug: $slug) {
      title
      slug
      cover
      contentHTML
      content
    }
  }
`;
export const GET_NEWS_BY_SLUG = gql`
  query GetNewsBySlug($slug: String!) {
    getNewsBySlug(slug: $slug) {
      title
      slug
      cover
      contentHTML
      content
    }
  }
`;

export const LIST_FOOD_RECEIPT = gql`
  query listFoodReceipt($page: Int, $perPage: Int) {
    listFoodReceipt(page: $page, perPage: $perPage) {
      docs {
        _id
        title
        slug
        content
        contentHTML
        cover
      }
      totalDocs
      totalPages
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $token: String!
    $email: String!
    $newPassword: String!
  ) {
    resetPassword(token: $token, email: $email, newPassword: $newPassword) {
      success
      statusCode
      message
    }
  }
`;
export const REQUEST_RESET_PASSWORD = gql`
  query requestResetPassword($email: String!) {
    requestResetPassword(email: $email) {
      success
      statusCode
      message
    }
  }
`;
export const CUSTOMER_GET_RECENTLY_VIEWED = gql`
  query CustomerGetRecentlyViewed {
    customerGetRecentlyViewed {
      _id
      name
      description
      sku
      slug
      salePrice
      images
      appliedVAT
      buyPriceExcTax
      buyPriceIncTax
      salePriceAfterDiscounted
      discountType
      discountValue
      category {
        _id
        name
      }
      isFavorite
    }
  }
`;

export const CUSTOMER_ADD_RECENTLY_VIEWED = gql`
  mutation CustomerAddToRecentlyViewed($id: ID!) {
    customerAddToRecentlyViewed(id: $id)
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!, $saleRegion: ID!) {
    getProductBySlug(slug: $slug, saleRegion: $saleRegion) {
      _id
      name
      category {
        name
        _id
      }
      description
      sku
      images
      videos
      salePrice
      salePriceAfterDiscounted
      discountType
      slug
      discountValue
      category {
        name
        _id
      }
    }
  }
`;
export const GET_ADS_DESKTOP = gql`
  query getAdsDesktop {
    getAdsDesktop {
      adsHomeLeft {
        imageUrl
      }
      adsHomeCenter {
        imageUrl
      }
      adsHomeRight {
        imageUrl
      }
    }
  }
`;
export const CUSTOMER_ADD_WISHLIST = gql`
  mutation CustomerAddToWishlist($id: ID!) {
    customerAddToWishlist(id: $id)
  }
`;
export const CUSTOMER_REMOVE_WISHLIST = gql`
  mutation CustomerRemoveFromWishlist($id: ID!) {
    customerRemoveFromWishlist(id: $id)
  }
`;

export const LIST_PRODUCTS = gql`
  query ListProducts(
    $category: ID!
    $saleRegion: ID!
    $page: Int!
    $perPage: Int!
  ) {
    listProducts(
      category: $category
      saleRegion: $saleRegion
      page: $page
      perPage: $perPage
    ) {
      docs {
        _id
        name
        description
        sku
        slug
        salePrice
        images
        appliedVAT
        buyPriceExcTax
        buyPriceIncTax
        salePriceAfterDiscounted
        discountType
        discountValue
        category {
          _id
          name
        }
        isFavorite
      }
      totalPages
      totalDocs
    }
  }
`;
export const UPLOAD_CHAT_MEDIA = gql`
  mutation UploadChatMedia($file: Upload!) {
    uploadChatMedia(file: $file)
  }
`;
export const SEARCH_PRODUCTS = gql`
  query SearchProducts(
    $keyword: String!
    $saleRegion: ID!
    $page: Int
    $perPage: Int
    $orderBy: QueryProductOrderBy
    $orderDir: QueryOrderByDirection
  ) {
    searchProducts(
      keyword: $keyword
      saleRegion: $saleRegion
      page: $page
      perPage: $perPage
      orderBy: $orderBy
      orderDir: $orderDir
    ) {
      docs {
        _id
        name
        description
        sku
        salePrice
        images
        appliedVAT
        buyPriceExcTax
        buyPriceIncTax
        salePriceAfterDiscounted
        discountType
        discountValue
        slug
        category {
          _id
          name
        }
      }
      totalPages
      totalDocs
    }
  }
`;
export const CUSTOMER_LIST_COUPON = gql`
  query CustomerListCoupon {
    customerListMyCoupon {
      code
      discountType
      discountValue
      isActive
      endDate
      remainingCount
      applyToOrderTotalAmount
    }
  }
`;
export const CUSTOMER_REMOVE_ADDRESS = gql`
  mutation CustomerRemoveAddress($id: ID!) {
    customerRemoveAddress(id: $id)
  }
`;

export const GET_PRODUCT_DETAIL = gql`
  query GetProduct($id: ID!, $saleRegion: ID!) {
    getProduct(id: $id, saleRegion: $saleRegion) {
      _id
      name
      description
      sku
      images
      videos
      salePrice
      salePriceAfterDiscounted
      discountType
      discountValue
      # salePriceInRegions {
      #   salePrice
      #   saleRegion {
      #     name
      #     _id
      #   }
      # }
      category {
        name
        _id
      }
    }
  }
`;
export const GET_PROMO_FLASH_SALE = gql`
  query GetPromoFlashSale($saleRegion: ID!) {
    getPromoFlashSale(saleRegion: $saleRegion) {
      bannerDesk
      products {
        _id
        name
        description
        sku
        salePrice
        images
        buyPriceExcTax
        buyPriceIncTax
        salePriceAfterDiscounted
        discountType
        discountValue
        category {
          _id
          name
        }
      }
      startDate
      endDate
    }
  }
`;
export const CUSTOMER_CALCULATE_SHIPPING_FEE = gql`
  query customerCalculateShippingFee($order: CustomerCreateOrderInput!) {
    customerCalculateShippingFee(order: $order) {
      shippingFee
    }
  }
`;
export const CUSTOMER_ADD_ADDRESS_V2 = gql`
  mutation customerAddAddressV2($addressInput: AddressInputV2!) {
    customerAddAddressV2(addressInput: $addressInput) {
      _id
      addressNo
    }
  }
`;
export const CUSTOMER_ADD_ADDRESS = gql`
  mutation CustomerAddAddress($addressInput: AddressInput!) {
    customerAddAddress(addressInput: $addressInput) {
      _id
      addressNo
    }
  }
`;
export const CUSTOMER_SEARCH_CUSTOMER = gql`
  query CustomerSearchCustomer(
    $keyword: String!
    $page: Int
    $perPage: Int
    $orderBy: QueryCustomerOrderBy
    $orderDir: QueryOrderByDirection
  ) {
    customerSearchCustomer(
      keyword: $keyword
      page: $page
      perPage: $perPage
      orderBy: $orderBy
      orderDir: $orderDir
    ) {
      docs {
        _id
        name
        email
      }
    }
  }
`;
export const CUSTOMER_CHECK_IN_STOCK = gql`
  query CustomerCheckInStock($details: [StockDetailInput]!, $branch: ID!) {
    customerCheckInStock(details: $details, branch: $branch) {
      product
      quantity
      inStock
    }
  }
`;
export const CHECK_OUT = gql`
  mutation CustomerCreateOrder(
    $customerCreateOrderInput: CustomerCreateOrderInput!
  ) {
    customerCreateOrder(customerCreateOrderInput: $customerCreateOrderInput) {
      _id
      orderCode
      createdBy {
        email
      }
      totalAmountFinal
      branch {
        _id
      }
    }
  }
`;
export const CUSTOMER_PRECALCULATE_DISCOUNT = gql`
  query CustomerPreCalculateOrderSummary(
    $preCalculateOrderSummaryRequest: PreCalculateOrderSummaryRequest!
  ) {
    customerPreCalculateOrderSummary(
      preCalculateOrderSummaryRequest: $preCalculateOrderSummaryRequest
    ) {
      totalAmountFinal
      totalAmountIncludesVAT
      discountType
      discountValue
    }
  }
`;
export const CUSTOMER_CANCEL_ORDER = gql`
  mutation CustomerCancelOrder($id: ID!) {
    customerCancelOrder(id: $id)
  }
`;
export const CUSTOMER_GET_ORDER = gql`
  query CustomerGetOrder($id: ID!) {
    customerGetOrder(id: $id) {
      _id
      details {
        product {
          _id
          name
        }
        discountType
        discountValue
        salePrice
        quantity
        salePriceAfterDiscounted
      }
      orderCode
      discountCode
      customer {
        name
        email
        phone
      }
      discountValue
      discountType
      isRequiredVatInvoice
      vatInvoiceCompanyName
      vatInvoiceCompanyTaxCode
      vatInvoiceCompanyAddress
      totalAmountFinal
      shippingAddress {
        addressNo
      }

      note
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client
  }
`;
export const SUBRICE = gql`
  subscription SubscribeNewChatMessage {
    subscribeNewChatMessage {
      from {
        _id
        email
        name
      }
      to {
        _id
        email
        name
      }
      content
      createdAt
    }
  }
`;
export const CUSTOMER_LIST_ORDERS = gql`
  query CustomerListOrders(
    $page: Int
    $perPage: Int
    $shippingStatus: [SellShippingStatus!]!
  ) {
    customerListOrders(
      page: $page
      perPage: $perPage
      shippingStatus: $shippingStatus
    ) {
      docs {
        _id
        orderCode
        totalAmount
        totalAmountFinal
        totalAmountIncludesVAT
        taxVAT
        details {
          product {
            name
            salePrice
          }
          quantity
        }
        driver {
          _id
          name
          avatar
          email
        }
        shippingAddress {
          addressNo
        }
        note
      }
      totalDocs
      totalPages
    }
  }
`;
// export const CUSTOMER_ADD_WISHLIST = gql`
//   mutation CustomerAddToWishlist($id: ID!) {
//     customerAddToWishlist(id: $id)
//   }
// `;
export const AddItemToWishList = gql`
  mutation AddItemToWishList($item: Product!) {
    AddItemToWishList(item: $item) @client
  }
`;
export const LIST_SALE_REGIONS = gql`
  query ListSaleRegions {
    listSaleRegions {
      _id
      name
      branches {
        _id
        name
        disabled
        address {
          addressNo
          ward {
            name
          }
          district {
            name
          }
          city {
            name
          }
        }
      }
    }
  }
`;
export const GET_HOME_PRODUCT_SECTIONS = gql`
  query GetHomeProductSections($saleRegion: ID!) {
    getHomeProductSections(saleRegion: $saleRegion) {
      title
      bannerDesk
      products {
        _id
        name
        slug
        salePrice
        images
        appliedVAT
        buyPriceExcTax
        buyPriceIncTax
        salePriceAfterDiscounted
        discountType
        discountValue
        category {
          _id
          name
        }
        isFavorite
      }
    }
  }
`;
export const GET_STICKERS = gql`
  query ListStickers {
    listStickers {
      name
      thumbnail
      items
    }
  }
`;

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      _id
      name
    }
  }
`;
export const CUSTOMER_UPDATE_ADDRESS = gql`
  mutation CustomerUpdateAddress(
    $id: ID!
    $addressUpdateInput: AddressUpdateInput!
  ) {
    customerUpdateAddress(id: $id, addressUpdateInput: $addressUpdateInput) {
      _id
    }
  }
`;

export const CUSTOMER_UPDATE_ADDRESS_V2 = gql`
  mutation CustomerUpdateAddressV2($id: ID!, $addressInput: AddressInputV2!) {
    customerUpdateAddressV2(id: $id, addressInput: $addressInput) {
      _id
    }
  }
`;

export const GET_LIST_CITIES = gql`
  query ListCites {
    listCities {
      _id
      name
    }
  }
`;
export const LIST_DISTRICTS = gql`
  query ListDistricts($cityId: String!) {
    listDistricts(cityId: $cityId) {
      _id
      name
    }
  }
`;
export const GET_LIST_WARDS = gql`
  query ListWards($districtId: String!) {
    listWards(districtId: $districtId) {
      _id
      name
    }
  }
`;
export const GET_WISHLIST = gql`
  query CustomerGetWishlist {
    customerGetWishlist {
      _id
      name
      description
      sku
      salePrice
      images
      buyPriceExcTax
      buyPriceIncTax
      salePriceAfterDiscounted
      appliedVAT
      discountType
      discountValue
      isFavorite
      category {
        _id
        name
      }
    }
  }
`;
export const CUSTOMER_GET_PROFILE = gql`
  query CustomerGetProfile {
    customerGetProfile {
      name
      email
      phone
      customerPoint
      address {
        _id
        addressNo
      }
    }
  }
`;
export const CUSTOMER_UPDATE_PROFILE = gql`
  mutation customerUpdateProfile(
    $customerUpdateProfileInput: CustomerUpdateProfileInput!
  ) {
    customerUpdateProfile(
      customerUpdateProfileInput: $customerUpdateProfileInput
    ) {
      name
      email
      phone
      customerPoint
      address {
        addressNo
      }
    }
  }
`;
export const CUSTOMER_UPLOAD_AVATAR = gql`
  mutation CustomerUploadAvatar($file: Upload!) {
    customerUploadAvatar(file: $file) {
      avatar
    }
  }
`;

export const CUSTOMER_UPDATE_PASSWORD = gql`
  mutation CustomerUpdatePassword(
    $oldPassword: String!
    $newPassword: String!
  ) {
    customerUpdatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

// ============= Log In - Register ================

export const LOG_IN = gql`
  mutation LOG_IN($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      jwt
      userId
      user {
        _id
        name
        email
        phone
        avatar
        customerPoint
        address {
          _id
          isPrimary
          addressNo
          latitude
          longitude
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      _id
      name
      description
      sku
      videos
      images
      salePrice
      salePriceInRegions {
        salePrice
        saleRegion {
          name
          _id
        }
      }
      category {
        name
        _id
      }
    }
  }
`;
