import ClientOnly from '../../components/Wrapper/fetchingClient';
import ResetPW from '../../containers/ResetPW/ResetPassword.container';

const ResetPWPage = () => {
  return (
    <ClientOnly>
      <ResetPW />
    </ClientOnly>
  );
};

export default ResetPWPage;
