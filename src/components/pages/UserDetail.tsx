import { VFC } from 'react';
import Spinner from 'components/atoms/Spinner';
import Footer from 'components/atoms/Footer';
import BurgerMenu from 'components/atoms/BurgerMenu';
import { useParams } from 'react-router-dom';
import Header from 'components/atoms/Header';
import User from 'components/templates/User';
import useGetUser from 'hooks/use-get-user';
import { useSelector } from 'react-redux';
import { RootState } from 'features/reducers';
import { User as UserType } from 'domains';

const UserDetail: VFC = () => {
  const { userId = '' } = useParams<{ userId: string }>();
  const { filteredUser, isLoading } = useGetUser(userId);
  const loggedInUser = useSelector<RootState, UserType | null>(
    (state) => state.user.loggedInUser,
  );

  return (
    <>
      {isLoading && !filteredUser ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <BurgerMenu />
          <User {...{ user: filteredUser, loggedInUser }} />
          <Footer />
        </>
      )}
    </>
  );
};
export default UserDetail;
