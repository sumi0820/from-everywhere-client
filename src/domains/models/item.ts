// eslint-disable-next-line import/no-cycle
import { User } from './user';

export type Item = {
  id?: string;
  name: string;
  description: string;
  image: string;
  condition?: string;
  accepted?: string;
  user: User;
  hi?: string[];
  timestamps: string;
  _id?: string;
};
