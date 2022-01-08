/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import { Navigate } from 'react-router';

type Props = {
  children: any;
  redirectTo: string;
};

const RequireAuth: FC<Props> = ({ children, redirectTo }) => {
  const { loggedInUser } = JSON.parse(
    JSON.parse(localStorage.getItem('persist:root')!).user,
  );

  const isAuthenticated = loggedInUser !== null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
