import React, { useReducer } from 'react';
import { UserContext } from './user.context';
const defaultInitialState = {
  user: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: state.user,
      };
    default:
      return state;
  }
}
export const UserProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState ?? defaultInitialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
