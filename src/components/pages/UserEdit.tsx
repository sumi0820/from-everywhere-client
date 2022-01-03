import { VFC } from 'react';
import Spinner from 'components/atoms/Spinner';
import Footer from 'components/atoms/Footer';
import BurgerMenu from 'components/atoms/BurgerMenu';
import useGetUser from 'hooks/use-get-user';
import { useParams } from 'react-router-dom';
import UserEditForm from 'components/templates/UserEditForm';
import Header from 'components/atoms/Header';

const UserEdit: VFC = () => {
  const { userId = '' } = useParams<{ userId: string }>();
  const { user, isLoading } = useGetUser(userId);

  return (
    <>
      {isLoading && !user ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <BurgerMenu />

          <UserEditForm />
          <Footer />
        </>
      )}
    </>
  );
};

export default UserEdit;
