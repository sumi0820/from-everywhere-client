// eslint-disable-next-line import/no-cycle
import { Item } from './item';

export type User = {
  id: string;
  login: string;
  username: string;
  email: string;
  password: string;
  imageProfile: string;
  imageBg?: string;
  bio: string;
  location?: string;
  item: Item;
  messages?: string[];
  feedback?: string[];
  accepted?: string;
  like: string[];
};
