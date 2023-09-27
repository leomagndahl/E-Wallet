import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./redux/configureStore.js";
import ReactDOM from "react-dom/client";
import { routes } from "generouted/react-router";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={createBrowserRouter(routes)} />
  </Provider>
);
