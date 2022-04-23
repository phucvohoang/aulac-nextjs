import ClientOnly from '../../components/Wrapper/fetchingClient';
import ForgetPW from '../../containers/ForgetPW/ForgetPW.container';

const ForgetPWPage = () => {
  return (
    <ClientOnly>
      <ForgetPW />
    </ClientOnly>
  );
};

export default ForgetPWPage;
