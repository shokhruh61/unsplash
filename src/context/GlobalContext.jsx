import { createContext, useReducer } from "react";

export const GlobalContext = createContext();
const changeState = (state, action) => {
  const { type, payload } = action;
};
export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    LikedImages: [],
  });
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
