import { createContext } from "react";

export const UserContext = createContext({
  state: {
    name: null,
    user: null,
    image: null
  },
  dispatch: Function.prototype
});