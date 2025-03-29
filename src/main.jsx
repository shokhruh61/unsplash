import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux"; // Redux Provider'ni import qilish
import { store } from "./redux/store.js"; // store ni to‘g‘ri import qilish
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalContextProvider>
      <App />
      <ToastContainer position="bottom-right" />
    </GlobalContextProvider>
  </Provider>,
);
