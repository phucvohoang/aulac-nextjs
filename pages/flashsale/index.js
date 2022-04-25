import CustomHead from '../../components/CustomHead';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import Flashsale from '../../containers/FlashSale/FlashSale.container';

const FlashsalePage = () => {
  return (
    <ClientOnly>
      <CustomHead title="Flashsale" />
      <Flashsale />
    </ClientOnly>
  );
};

export default FlashsalePage;
