import { VFC } from 'react';
import Spinner from 'components/atoms/Spinner';
import Footer from 'components/atoms/Footer';
import BurgerMenu from 'components/atoms/BurgerMenu';
import useGetUser from 'hooks/use-get-user';
import { useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import User from 'components/templates/User';

const UserDetail: VFC = () => {
  const { userId = '' } = useParams<{ userId: string }>();
  const { user, isLoading } = useGetUser(userId);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {isLoading && !user ? (
            <Spinner />
          ) : (
            <>
              <Header />
              <BurgerMenu />
              <User {...{ user }} />
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserDetail;
