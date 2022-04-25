import CustomHead from '../../components/CustomHead';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import Privacy from '../../containers/Privacy/Privacy';

const PrivacyPage = () => {
  return (
    <ClientOnly>
      <CustomHead title="Chính Sách Âu Lạc" />
      <Privacy />
    </ClientOnly>
  );
};

export default PrivacyPage;
