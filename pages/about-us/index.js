import ClientOnly from '../../components/Wrapper/fetchingClient';
import Response from '../../containers/Response/Response.component';

const About = () => {
  return (
    <ClientOnly>
      <Response />
    </ClientOnly>
  );
};

export default About;
