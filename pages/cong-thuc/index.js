import ClientOnly from '../../components/Wrapper/fetchingClient';
import Receipt from '../../containers/Receipt/Receipt.container';

const RecieptPage = () => {
  return (
    <ClientOnly>
      <Receipt />
    </ClientOnly>
  );
};

export default RecieptPage;
