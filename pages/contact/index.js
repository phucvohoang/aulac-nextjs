import CustomHead from '../../components/CustomHead';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import Contact from '../../containers/Contact/Contact';

const ContactPage = () => {
  return (
    <ClientOnly>
      <CustomHead title="Liên Hệ" />
      <Contact />
    </ClientOnly>
  );
};

export default ContactPage;
