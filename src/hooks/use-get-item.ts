/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Item } from 'hooks/use-get-items';

import { mockData } from 'data/items';

type ReturnValue = {
  item: Item | undefined;
  isLoading: boolean;
};

const useGetItem = (id: string): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    let isUnmounted = false;
    // TODO: Need to fetch async
    const load = (): void => {
      setIsLoading(true);

      if (!isUnmounted && mockData) {
        setItem(mockData.filter((it) => it._id === id)[0]);
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
