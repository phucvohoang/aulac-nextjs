import ClientOnly from '../../../../components/Wrapper/fetchingClient';
import FacbookCallBack from '../../../../containers/AuthCallback/Facebook';

const FacbookCallBackPage = () => {
  return (
    <ClientOnly>
      <FacbookCallBack />
    </ClientOnly>
  );
};

export default FacbookCallBackPage;
