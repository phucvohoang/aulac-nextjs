import ClientOnly from '../../components/Wrapper/fetchingClient';
import Receipt from '../../containers/Receipt/Receipt.container';
import CustomHead from '../../components/CustomHead';
const RecieptPage = () => {
  return (
    <ClientOnly>
      <CustomHead title="Công Thức" />
      <Receipt />
    </ClientOnly>
  );
};

export default RecieptPage;
