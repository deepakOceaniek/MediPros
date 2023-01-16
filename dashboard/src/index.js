import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import {positions ,transitions,Provider as AlertProvider} from "react-alert";
import  AlertTemplate  from "react-alert-template-basic";
import store from "./store";
import { ChakraProvider } from "@chakra-ui/react";

const options = {
timeout:5000,
position:positions.BOTTOM_CENTER,
transition:transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} >
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </AlertProvider >
  </Provider>
);
