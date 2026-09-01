import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@/App";
import { store } from "@/store/index";
import "./scss/global.scss";

const element = document.querySelector("#root");
const root = createRoot(element);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
