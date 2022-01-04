import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { itemsSlice, ItemsState } from '../features/item';
import { Item, getItems } from '../domains/index';

type ReturnValue = {
  items: Item[];
  isLoading: boolean;
};

const useGetItems = (): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector<ItemsState, Item[]>((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let isUnmounted = false;
    const { itemsGotten } = itemsSlice.actions;

    const load = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const items = await getItems(); // eslint-disable-line no-shadow

        if (!isUnmounted) {
          dispatch(itemsGotten({ items }));
        }
      } catch (err) {
        throw new Error(`something's wrong`);
      } finally {
        setIsLoading(false);
      }

      setIsLoading(false);
    };

    void load();

    return () => {
      isUnmounted = true;
    };
  }, [dispatch]);
  console.log(items);

  return { items, isLoading };
};

export default useGetItems;
