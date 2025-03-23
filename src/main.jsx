import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // ✅ Redux Toolkit store
import { GlobalContextProvider } from "./context/GlobalContext"; // ✅ Context Provider
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </Provider>,
);
