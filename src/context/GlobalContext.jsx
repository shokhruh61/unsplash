import { createContext, useReducer } from "react";
import LikedImages from "../pages/LikedImages";

export const GlobalContext = createContext();
const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LIKE":
      return {
        ...state,
        LikedImages: [...state.LikedImages, payload],
      };

    case "UNLIKE":
      return {
        ...state,
        LikedImages: state.LikedImages.filter((image) => image.id != payload),
      };

    default:
      return state;
  }
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
