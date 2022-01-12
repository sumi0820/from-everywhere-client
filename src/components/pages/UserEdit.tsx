import { VFC } from 'react';
import Spinner from 'components/atoms/Spinner';
import Footer from 'components/atoms/Footer';
import BurgerMenu from 'components/atoms/BurgerMenu';
import UserEditForm from 'components/templates/UserEditForm';
import Header from 'components/atoms/Header';
import { useSelector } from 'react-redux';
import { RootState } from 'features/reducers';
import { User as UserType } from 'domains';

const UserEdit: VFC = () => {
  const loggedInUser = useSelector<RootState, UserType | null>(
    (state) => state.user.loggedInUser,
  );

  return (
    <>
      {loggedInUser && !loggedInUser ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <BurgerMenu />
          <UserEditForm loggedInUser={loggedInUser} />
          <Footer />
        </>
      )}
    </>
  );
};
export default UserEdit;
