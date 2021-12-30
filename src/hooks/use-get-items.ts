import { useEffect, useState } from 'react';

import { mockData } from 'data/items';

type ReturnValue = {
  latestItems: Items[];
  isLoading: boolean;
};

export type Items = {
  _id: string;
  image: string;
  accepted?: boolean | null;
  hi?: string[];
  name: string;
  description: string;
  condition: string;
  user: { username: string };
};

const useGetItems = (): ReturnValue => {
  const [isLoading, setIsLoading] = useState(false);
  const [latestItems, setLatestItems] = useState<Items[]>([]);

  useEffect(() => {
    const isUnmounted = false;

    // TODO: Need to fetch async
    // const load = async (): Promise<void> => {
    const load = (): void => {
      setIsLoading(true);

      if (!isUnmounted && mockData.length) {
        const sorted = mockData.sort((a, b) => {
          if (a.updatedAt < b.updatedAt) return 1;
          if (a.updatedAt > b.updatedAt) return -1;

          return 0;
        });
        // .filter((item) => item.user._id != loggedInUser._id);
        if (mockData.length > 7) {
          setLatestItems(sorted.slice(0, 6));
        } else {
          setLatestItems(sorted);
        }
      }

      setIsLoading(false);
    };

    void load();
  }, []);

  return { latestItems, isLoading };
};

export default useGetItems;
