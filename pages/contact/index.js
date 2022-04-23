import ClientOnly from '../../components/Wrapper/fetchingClient';
import Contact from '../../containers/Contact/Contact';

const ContactPage = () => {
  return (
    <ClientOnly>
      <Contact />
    </ClientOnly>
  );
};

export default ContactPage;
