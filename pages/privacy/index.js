import ClientOnly from '../../components/Wrapper/fetchingClient';
import Privacy from '../../containers/Privacy/Privacy';

const PrivacyPage = () => {
  return (
    <ClientOnly>
      <Privacy />
    </ClientOnly>
  );
};

export default PrivacyPage;
