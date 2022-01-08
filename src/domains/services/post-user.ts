/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from './config';
import { User } from '../models/user';

export const postSignIn = async (options?: Options): Promise<User> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };

  const response = await ky.post(`signin/`, mergedOptions);
  const loggedInUser = await response.json();

  if (!loggedInUser) {
    throw Error('API type error');
  }

  return loggedInUser;
};

export const postSignInTest = async (options?: Options): Promise<User> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };

  const response = await ky.post(`signin-test/`, mergedOptions);
  const loggedInUser = await response.json();

  if (!loggedInUser) {
    throw Error('API type error');
  }

  return loggedInUser;
};

export const postSignUp = async (options?: Options): Promise<User> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };

  const response = await ky.post(`signup/`, mergedOptions);
  const loggedInUser = await response.json();

  if (!loggedInUser) {
    throw Error('API type error');
  }

  return loggedInUser;
};
