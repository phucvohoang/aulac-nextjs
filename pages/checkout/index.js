import ClientOnly from '../../components/Wrapper/fetchingClient';
import Checkout from '../../containers/Checkout/Checkout.container.jsx';

const CheckoutPage = () => {
  return (
    <ClientOnly>
      <Checkout />
    </ClientOnly>
  );
};

export default CheckoutPage;
