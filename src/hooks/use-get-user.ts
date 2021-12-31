/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { mockUsers } from 'data/users';

export type User = {
  _id: string;
  imageProfile: string;
  imageBg: string;
  email: string;
  username: string;
  location: string;
  bio: string;
};

type ReturnValue = {
  user: User | undefined;
  isLoading: boolean;
};

const useGetUser = (id: string): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    let isUnmounted = false;
    // TODO: Need to fetch async
    const load = (): void => {
      setIsLoading(true);

      if (!isUnmounted && mockUsers) {
        setUser(mockUsers.filter((it) => it._id === id)[0]);
        setIsLoading(false);
      }
    };

    void load();

    return () => {
      isUnmounted = true;
    };
  }, [id]);

  return { user, isLoading };
};

export default useGetUser;
