import React from 'react';
import { Button, notification } from 'antd';
import { Link } from 'next/link'
import WrapperRouter from '../WrapperRouter/WrapperRouter';
import {
  addCommas,
  cleaningDescription,
  convertDataEditorToHTML,
} from '../../util/helper';
import {
  createMessageOnFirebase,
  createUserOnFirebase,
  isUserExistOnSystem,
} from '../../firebase/firebase.util';
import { Carousel } from 'antd';
import { addViewedProduct } from '../../util/helper';
import Video from '../Chat-Widget/Video';
import WrapperTranslate from '../WrapperTranslate/WrapperTranslate';
// import { withTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
//import productImg_4 from './../../public/assets/products/seafood-4.jpg';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      images: [],
      isSending: false,
      videos: [
        'https://dev.api.aulacshop.com/chat/videos/94a1a300-1668-4f1d-a1bf-b8180a72b162.mp4',
      ],
      productCart: props.productCart,
      updateQuantity: {
        isUpdate: false,
        newQuantity: 0,
      },
      imageShowing: '',
      currentShowing: {
        type: 'image',
        url: '',
      },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const videos = (this.props?.product?.videos ?? []).map((video) => ({
      type: 'video',
      url: video,
    }));

    this.setState(() => ({
      product: this.props.product,
      images: [...this.props.product.images],
      videos: [...videos],
    }));
    addViewedProduct(this.props.product);
  }

  increaseQuantity = () => {
    const { updateQuantity } = this.state;
    if (updateQuantity.isUpdate) {
      this.setState((prevState) => {
        return {
          updateQuantity: {
            isUpdate: true,
            newQuantity: prevState.updateQuantity.newQuantity + 1,
          },
        };
      });
    } else {
      this.setState(() => {
        return {
          updateQuantity: {
            isUpdate: true,
            newQuantity: this.props.product.quantity + 1,
          },
        };
      });
    }
  };
  descreaseQuantity = () => {
    const { updateQuantity } = this.state;
    if (updateQuantity.newQuantity > 0 || !updateQuantity.isUpdate) {
      if (updateQuantity.isUpdate) {
        this.setState((prevState) => {
          return {
            updateQuantity: {
              isUpdate: true,
              newQuantity: prevState.updateQuantity.newQuantity - 1,
            },
          };
        });
      } else {
        this.setState(() => {
          return {
            updateQuantity: {
              isUpdate: true,
              newQuantity: this.props.product.quantity - 1,
            },
          };
        });
      }
    }
  };
  addProductCart = (product) => {
    // // console.log('add product')
    const { isUpdate, newQuantity } = this.state.updateQuantity;
    if (this.props.isInCart) {
      const newProduct = {
        ...product,
        quantity: newQuantity,
      };
      this.props.update(newProduct);
    } else {
      let newProduct = { ...product };
      if (isUpdate) {
        newProduct.quantity = newQuantity;
      }
      this.props.add(newProduct);
    }
    this.setState(() => {
      return {
        updateQuantity: {
          isUpdate: false,
        },
      };
    });
    //this.props.dispatch(addCart(cart));
  };

  renderImageSlider = () => {
    const { images, videos } = this.state;
    const result = [...videos, ...images];
    return result.map((item, idx) => {
      if (item?.type) {
        return this.renderVideoSlider(item.url, idx);
      } else {
        return (
          <div
            style={{ cursor: 'pointer', height: '160px', width: '100px' }}
            onClick={() => {
              this.setState(() => ({
                currentShowing: { type: 'image', url: item },
              }));
            }}
            key={idx}
            className="img-slider--item"
          >
            <img src={item} height="100px" alt={`Product Item ${idx + 1}`} />
          </div>
        );
      }
    });
  };
  renderVideoSlider = (video, idx) => {
    if (video.startsWith('https://www.youtube.com/embed/')) {
      const videoId = video.split('/').pop();
      return (
        <div
          style={{ cursor: 'pointer', height: '160px', width: '100px' }}
          onClick={() => {
            this.setState(() => ({
              currentShowing: { type: 'youtube', url: video },
            }));
          }}
          key={idx}
          className="img-slider--item"
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            width="75px"
            alt={`Product Item ${idx + 1}`}
          />
        </div>
      );
    }
    return (
      <div
        style={{
          cursor: 'pointer',
          height: '160px',
          width: '100px',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={() => {
          this.setState(() => ({
            currentShowing: { type: 'video', url: video },
          }));
        }}
        key={idx}
        className="img-slider--item"
      >
        <Video isInPreviewProduct={true} src={video} />
      </div>
    );
  };
  renderCarousel = () => {
    return (
      <Carousel autoplay slidesPerRow={3}>
        {this.renderImageSlider()}
      </Carousel>
    );
  };
  renderDescription = () => {
    const { description } = this.props.product;
    if (description) {
      try {
        const parsedDescription = JSON.parse(description);
        const body = convertDataEditorToHTML(parsedDescription);
        return (
          <div
            className="product-detail__content__description"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        );
      } catch (e) {
        return (
          <div
            className="product-detail__content__description"
            dangerouslySetInnerHTML={{
              __html: cleaningDescription(description),
            }}
          />
        );
      }
    }
  };

  renderProductDetailQuantity = () => {
    const { updateQuantity } = this.state;
    //let {cart} = this.props;
    // cart = []
    // productCart = []
    const { product } = this.props;
    let image =
      product.images.length > 0
        ? product.images[0]
        : 'https://aulacshop.com/uploads/img/1595487543_CHA-BONG-GA--GOI.jpg';
    return (
      <div className="content__quantity--item">
        <div className="quantity__item__img">
          <img src={image} alt={`Quantity 1`} />
        </div>
        <div className="quantity__item__name">
          <<Link href="#">{product.name}</Link>
        </div>
        <div className="quantity__item__price">
          <span>{addCommas(product.salePrice)}đ</span>
        </div>
        <div className="quantity__item__action">
          <span
            className="item__action__minus"
            onClick={this.descreaseQuantity}
          >
            <i className="fas fa-minus item__action__minus" />
          </span>
          <span className="item__action__number">
            {updateQuantity.isUpdate
              ? updateQuantity.newQuantity
              : product.quantity}
          </span>
          <span className="item__action__plus" onClick={this.increaseQuantity}>
            <i className="fas fa-plus item__action__plus" />
          </span>
        </div>
      </div>
    );
  };

  actionItemQuantity = (e, product) => {
    const iconClass = e.target.className;
    let { cart } = this.props;
    let productItemArr = cart.filter((c) => c.product.id === product.id);

    if (iconClass.includes('item__action__plus')) {
      if (productItemArr.length > 0) {
        cart = cart.map((c) => {
          if (c.product.id === product.id) {
            c.quantity += 1;
          }
          return c;
        });
      } else {
        cart.push({
          product: product,
          quantity: 1,
        });
      }
    } else if (iconClass.includes('item__action__minus')) {
      if (productItemArr.length > 0) {
        if (productItemArr[0].quantity > 0) {
          cart = cart.map((c) => {
            if (c.product.id === productItemArr[0].product.id) {
              c.quantity -= 1;
            }
            return c;
          });
        } else {
          cart = cart.filter((c) => c !== productItemArr[0].product.id);
        }
      }
    }

    //this.props.dispatch(addCart(cart));
  };
  hanldeSendProductToAdmin = async () => {
    const {
      product,
      currentUser,
      isLoggedIn,
      handleShowPopChat,
    } = this.props;
    if (isLoggedIn) {
      const { _id: uid, email, name } = currentUser;
      // // console.log(product);
      this.setState(() => ({ isSending: true }));
      const payload = {
        content: JSON.stringify({
          images: product.images,
          name: product.name,
          salePrice: product.salePrice,
        }),
        createdAt: Date.now(),
        from: {
          avatar: 'empty',
          email,
          uid,
        },

        seen: false,
        to: null,
        type: 'product',
      };

      const idOnFirebase = await isUserExistOnSystem(uid);
      if (idOnFirebase) {
        const isSent = await createMessageOnFirebase(payload);
        if (isSent) {
          this.setState(() => ({ isSending: false }));

          handleShowPopChat();
          return notification.success({
            message: 'Đã gửi',
            description:
              'Đã gửi cho tư vấn viên, bạn có thể xem trong tin nhắn',
          });
        }
        // setShowPanel('1');
        this.setState(() => ({ isSending: false }));
        notification.error({
          message: 'Lỗi',
          description: 'Không thể gửi tin nhắn hỗ trợ cho tư vấn viên',
        });
      } else {
        const payloadUser = {
          uid,
          email,
          name,
          createdAt: Date.now(),
          avatar: '',
          seen: false,
        };
        const isSuccess = await createUserOnFirebase(payloadUser);
        if (isSuccess) {
          const isSent = await createMessageOnFirebase(payload);
          if (isSent) {
            this.setState(() => ({ isSending: false }));
            handleShowPopChat();
            return notification.success({
              message: 'Đã gửi',
              description:
                'Đã gửi cho tư vấn viên, bạn có thể xem trong tin nhắn',
            });
          }
          this.setState(() => ({ isSending: false }));
          notification.error({
            message: 'Lỗi',
            description: 'Không thể gửi tin nhắn hỗ trợ cho tư vấn viên',
          });
        } else {
          this.setState(() => ({ isSending: false }));
          notification.error({
            message: 'Lỗi',
            description: 'Không thể gửi tin nhắn hỗ trợ cho tư vấn viên',
          });
        }
      }
      // const messagesRef = firestore
      //   .collection('messages')
      //   .doc(uid)
      //   .collection('conversations');
      // firestore
      //   .collection('users')
      //   .add({
      //     uid,
      //     email,
      //   })
      //   .then(async () => {
      //     await messagesRef.add({
      //       type: 'product',
      //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      //       uid,
      //       content: JSON.stringify({
      //         images: product.images,
      //         name: product.name,
      //         salePrice: product.salePrice,
      //       }),
      //       photoUrl: '',
      //     });
      //     setShowPanel('1');
      //   });
    } else {
      notification.warning({
        message: 'Xin vui lòng đăng nhập',
      });
    }
  };

  renderCurrentShowingHelper = () => {
    const { currentShowing } = this.state;

    switch (currentShowing.type) {
      case 'image':
        const { product } = this.props;
        let image =
          product.images.length > 0
            ? product.images[0]
            : 'https://aulacshop.com/uploads/img/1595487543_CHA-BONG-GA--GOI.jpg';
        return (
          <img
            src={currentShowing.url ? currentShowing.url : image}
            alt="Product Detail"
          />
        );
      case 'video':
        return (
          <Video
            customStyle={{ width: '100%' }}
            src={`${currentShowing.url}`}
          />
        );

      case 'youtube':
        let embed = `<iframe width="100%" height="auto" src="${currentShowing.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        return <div dangerouslySetInnerHTML={{ __html: embed }} />;
    }
  };
  render() {
    const { updateQuantity } = this.state;
    const { product, t } = this.props;
    return (
      <div className="product-detail__container">
        <div className="product-detail__image">
          <div className="product-detail__image--img">
            {this.renderCurrentShowingHelper()}
          </div>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{t('image')}</p>
          <div className="product-detail__image--img-slider">
            {this.renderCarousel()}
          </div>
        </div>
        <div className="product-detail__content">
          <div className="qr__code">
            <QRCode
              value={`${product.sku}`}
              size={64}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'L'}
              includeMargin={false}
              renderAs={'svg'}
            />
          </div>
          <div className="product-detail__content--detail">
            <div className="product-detail__content__title">
              <h2>{product.name}</h2>
            </div>
            <div
              className="product-detail__content__rating"
              style={{ display: 'none' }}
            />
            <div className="product-detail__content__price">
              <span>{addCommas(product.salePrice)}đ</span>
            </div>
            {this.renderDescription()}
          </div>
          <div className="product-detail__content--quantity">
            <div className="content--quantity--list-item">
              {this.renderProductDetailQuantity()}
            </div>
            <div className="content--quantity--action">
              <div className="content--quantity__add-cart">
                <button
                  disabled={!updateQuantity.isUpdate && this.props.isInCart}
                  onClick={() => this.addProductCart(product)}
                >
                  <i className="fas fa-shopping-bag" />
                  {this.props.isInCart ? t('update') : t('addCart')}
                </button>
              </div>
              <div className="content--quantity__action-btn">
                <span>
                  <i className="fas fa-retweet" />
                </span>
                <span>
                  <i className="far fa-heart" />
                </span>
              </div>
            </div>
            <div
              className="content--quantity__add-cart"
              style={{ marginTop: '2rem', width: '25%' }}
            >
              <Button
                onClick={this.hanldeSendProductToAdmin}
                block
                type="primary"
                size="large"
                shape="round"
                danger
                loading={this.state.isSending}
              >
                {t('support')}
              </Button>
            </div>
            <div className="content--quantity--tag">
              <div className="quantity__tag__category">
                <p>
                  {t('category')}:
                  <span>{product.category && product.category.name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WrapperRouter(WrapperTranslate(ProductDetail));
