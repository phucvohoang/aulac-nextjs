import ClientOnly from '../../components/Wrapper/fetchingClient';
import Response from '../../containers/Response/Response.component';
import CustomHead from '../../components/CustomHead';
const About = () => {
  return (
    <ClientOnly>
      <CustomHead />
      <Response />
    </ClientOnly>
  );
};

export default About;
