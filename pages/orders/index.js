import CustomHead from '../../components/CustomHead';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import Order from '../../containers/Order/Order.container';

const OrderPage = () => {
  return (
    <ClientOnly>
      <CustomHead title="Giỏ Hàng" />
      <Order />
    </ClientOnly>
  );
};

export default OrderPage;
