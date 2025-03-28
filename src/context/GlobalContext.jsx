import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state; // Default case qo'shildi
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, { user: false });

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
