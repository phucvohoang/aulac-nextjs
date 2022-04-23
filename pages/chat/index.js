import ClientOnly from '../../components/Wrapper/fetchingClient';
import Chat from '../../containers/ChatNew/Chat.container';

const ChatPage = () => {
  return (
    <ClientOnly>
      <Chat />
    </ClientOnly>
  );
};

export default ChatPage;
