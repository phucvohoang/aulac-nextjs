import ClientOnly from '../../components/Wrapper/fetchingClient';
import Order from '../../containers/Order/Order.container';

const OrderPage = () => {
  return (
    <ClientOnly>
      <Order />
    </ClientOnly>
  );
};

export default OrderPage;
