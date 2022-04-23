import ClientOnly from '../../components/Wrapper/fetchingClient';
import Profile from '../../containers/Profile/Profile.container';

const ProfilePage = () => {
  return (
    <ClientOnly>
      <Profile />
    </ClientOnly>
  );
};

export default ProfilePage;
