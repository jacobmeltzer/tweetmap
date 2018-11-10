import React from "react";
import { render } from "react-dom";
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import App from "./App";

const options = {
  timeout: 5000,
  position: "top left",
  offset: '30px',
};

const Page = () => (
  <Provider template={AlertTemplate} {...options}>
    <App />
  </Provider>
);

render(<Page />, document.getElementById("root"));
