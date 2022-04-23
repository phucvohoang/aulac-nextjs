import ClientOnly from '../../components/Wrapper/fetchingClient';
import News from '../../containers/News/News.container';

const NewPage = () => {
  return (
    <ClientOnly>
      <News />
    </ClientOnly>
  );
};

export default NewPage;
