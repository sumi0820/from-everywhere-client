/* eslint-disable react-hooks/exhaustive-deps */
import { User } from 'domains';
import { RootState } from 'features/reducers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Item as ItemType } from '../domains/models/item';

type ReturnValue = {
  filteredUser: User | undefined;
  isLoading: boolean;
};

const useGetUser = (id: string): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector<RootState, ItemType[]>((state) => state.item.items);
  const [filteredUser, setFilteredUser] = useState<User>();

  useEffect(() => {
    let isUnmounted = false;
    const load = (): void => {
      setIsLoading(true);

      if (!isUnmounted && items) {
        const { user } = items.filter((elem) => elem.user._id === id)[0];

        setFilteredUser(user);
        setIsLoading(false);
      }
    };

    void load();

    return () => {
      isUnmounted = true;
    };
  }, [id]);

  return { filteredUser, isLoading };
};

export default useGetUser;
