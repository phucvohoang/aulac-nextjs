import CustomHead from '../../components/CustomHead';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import News from '../../containers/News/News.container';

const NewPage = () => {
  return (
    <ClientOnly>
      <CustomHead title="Tin Tức" />
      <News />
    </ClientOnly>
  );
};

export default NewPage;
