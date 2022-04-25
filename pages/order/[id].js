import OrderDetail from '../../containers/OrderDetails/index';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import CustomHead from '../../components/CustomHead';
import { useRouter } from 'next/router';
const OrderDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ClientOnly>
      <CustomHead title="Đơn Hàng Chi Tiết" />
      <OrderDetail orderId={id} />
    </ClientOnly>
  );
};

export default OrderDetailPage;
