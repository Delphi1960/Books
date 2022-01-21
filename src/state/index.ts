import { atom } from 'recoil';

import { AuthState } from '../types/loginAtom.type';

export const userLoginAtom = atom({
  key: "userLoginAtom",
  default: "",
});
export const isPasswordAtom = atom({
  key: "isPasswordAtom",
  default: "",
});
export const eMailAtom = atom({
  key: "eMailAtom",
  default: "",
});
export const rememberMeAtom = atom({
  key: "rememberMeAtom",
  default: false,
});

// export interface AuthState {
//   user: string | null;
//   isAuthed: boolean;
// }
export const authState = atom<AuthState>({
  key: "authState",
  default: { user: null, isAuthed: false },
});

//=====================================================================

// export const listStateAtom = atom({
//   key: "listStateAtom",
//   default: [
//     {
//       userId: 0,
//       id: 0,
//       title: "",
//       body: "",
//     },
//   ],
// });

export const filteredListAtom = atom({
  key: "filteredListAtom",
  default: "Все",
});
// export const filteredListSelector = selector({
//   key: "filteredListSelector",
//   get: ({ get }) => {
//     const filter = get(filteredListAtom);
//     const post = get(listStateAtom);
//     switch (filter) {
//       case "Нечетные":
//         return post.filter((item) => item.id % 2 !== 0);
//       case "Четные":
//         return post.filter((item) => item.id % 2 === 0);
//       default:
//         return post;
//     }
//   },
// });
