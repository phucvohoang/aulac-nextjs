import CustomHead from '../../components/CustomHead';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import ForgetPW from '../../containers/ForgetPW/ForgetPW.container';

const ForgetPWPage = () => {
  return (
    <ClientOnly>
      <CustomHead title="Quên Mật Khẩu" />
      <ForgetPW />
    </ClientOnly>
  );
};

export default ForgetPWPage;
