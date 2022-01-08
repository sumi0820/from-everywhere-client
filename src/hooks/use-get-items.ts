import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'features/reducers';
import { itemsSlice } from '../features/item';
import { getItems } from '../domains';
import { Item as ItemType } from '../domains/models/item';

type ReturnValue = {
  items: ItemType[];
  isLoading: boolean;
};

const useGetItems = (): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector<RootState, ItemType[]>((state) => state.item.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let isUnmounted = false;
    const { itemsGotten } = itemsSlice.actions;

    const load = async (): Promise<void> => {
      try {
        const fetchedItems = await getItems(); // eslint-disable-line no-shadow

        if (!isUnmounted) {
          dispatch(itemsGotten({ items: fetchedItems }));
          console.log(items);
          // setItems(fetchedItems);
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
  }, [dispatch, items]);

  return { items, isLoading };
};

export default useGetItems;
