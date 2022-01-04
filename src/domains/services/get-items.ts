/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { Item } from '../models/item';

const getItems = async (options?: Options): Promise<Item[]> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };

  const response = await ky.get(`items/`, mergedOptions);
  const items = await response.json();

  if (!items) {
    throw Error('API type error');
  }

  return items;
};

export default getItems;
