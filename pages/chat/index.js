import CustomHead from '../../components/CustomHead';
import ClientOnly from '../../components/Wrapper/fetchingClient';
import Chat from '../../containers/ChatNew/Chat.container';

const ChatPage = () => {
  return (
    <ClientOnly>
      <CustomHead />
      <Chat />
    </ClientOnly>
  );
};

export default ChatPage;
