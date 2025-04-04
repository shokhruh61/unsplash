import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "AUTH_READY":
      return {
        ...state,
        authReady: true,
      };

    case "LOGIN":
      return { ...state, user: payload };

    case "LOGOUT":
      return { ...state, user: null };

    case "UPDATE_PHOTO": // ✅ Yangi rasmni global holatda saqlash
      return {
        ...state,
        user: { ...state.user, photoURL: payload },
      };

    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: false,
    authReady: true,
  });

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
