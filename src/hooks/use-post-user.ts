/* eslint-disable react-hooks/exhaustive-deps */
import { postSignIn, postSignUp } from '../domains/index';

// import { userSlice } from '../features/user';

// type ReturnType = {
//   loggedInUser: User;
// };

export const useSignIn = (email: string, password: string): void => {
  const load = async (): Promise<void> => {
    // setIsLoading(true);
    try {
      const user = [
        await postSignIn({
          json: {
            email,
            password,
          },
        }),
      ]; // eslint-disable-line no-shadow
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`succeccfully logged in ${user}`);

      // dispatch(userGotten({ loggedInUser: user }));
    } catch (err) {
      throw new Error(`something's wrong`);
    }
  };

  void load();
};
// export const useSignInTest = (): ReturnType => {
//   const [user, setUser] = useState<User>();

//   const load = async (): Promise<void> => {
//     // setIsLoading(true);
//     try {
//       const user = await postSignInTest(); // eslint-disable-line no-shadow
//       // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//       console.log(`succeccfully logged in ${user}`);
//       setUser(user);
//     } catch (err) {
//       throw new Error(`something's wrong`);
//     }
//   };

//   void load();

//   return { loggedInUser: user! };
// };

export const useSignUp = (email: string, password: string): void => {
  const load = async (): Promise<void> => {
    try {
      const user = [
        await postSignUp({
          json: {
            email,
            password,
          },
        }),
      ]; // eslint-disable-line no-shadow
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`succeccfully sign up ${user}`);

      // dispatch(userGotten({ loggedInUser: user }));
    } catch (err) {
      throw new Error(`something's wrong`);
    }
  };

  void load();
};
