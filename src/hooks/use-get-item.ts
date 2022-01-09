/* eslint-disable react-hooks/exhaustive-deps */
import { RootState } from 'features/reducers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Item, Item as ItemType } from '../domains/models/item';

type ReturnValue = {
  item: Item | undefined;
  isLoading: boolean;
};

const useGetItem = (id: string): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector<RootState, ItemType[]>((state) => state.item.items);
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    let isUnmounted = false;
    const load = (): void => {
      setIsLoading(true);

      if (!isUnmounted && items) {
        setItem(items.filter((elem) => elem.id === id)[0]);
        setIsLoading(false);
      }
    };

    void load();

    return () => {
      isUnmounted = true;
    };
  }, [id]);

  return { item, isLoading };
};

export default useGetItem;
