import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_LIKED":
      return {
        ...state,
        LikedImages: [...state.LikedImages, payload], // ✅ Liked image qo'shish
      };

    case "REMOVE_FROM_LIKED":
      return {
        ...state,
        LikedImages: state.LikedImages.filter((img) => img.id !== payload.id), // ✅ Liked image o‘chirish
      };

    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    LikedImages: [], // Boshlang‘ich state
  });

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
