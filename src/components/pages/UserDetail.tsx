import { VFC } from 'react';
import Spinner from 'components/atoms/Spinner';
import Footer from 'components/atoms/Footer';
import BurgerMenu from 'components/atoms/BurgerMenu';
import { useParams } from 'react-router-dom';
import Header from 'components/atoms/Header';
import User from 'components/templates/User';
import useGetUser from 'hooks/use-get-user';

const UserDetail: VFC = () => {
  const { userId = '' } = useParams<{ userId: string }>();
  const { filteredUser, isLoading } = useGetUser(userId);

  return (
    <>
      {isLoading && !filteredUser ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <BurgerMenu />
          <User {...{ user: filteredUser }} />
          <Footer />
        </>
      )}
    </>
  );
};
export default UserDetail;
