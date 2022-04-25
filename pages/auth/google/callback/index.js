import ClientOnly from '../../../../components/Wrapper/fetchingClient';
import GoogleCallback from '../../../../containers/AuthCallback/Google';

const GoogleCallbackPage = () => {
  return (
    <ClientOnly>
      <GoogleCallback />
    </ClientOnly>
  );
};

export default GoogleCallbackPage;
