import ClientOnly from '../../components/Wrapper/fetchingClient';
import Flashsale from '../../containers/FlashSale/FlashSale.container';

const FlashsalePage = () => {
  return (
    <ClientOnly>
      <Flashsale />
    </ClientOnly>
  );
};

export default FlashsalePage;
