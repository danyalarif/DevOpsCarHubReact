import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom'
import { NotificationsProvider } from "@mantine/notifications";
var blue = [
  "hsl(215, 100%, 34%)",
  "hsl(215, 100%, 39%)",
  "hsl(215, 100%, 43%)",
  "hsl(215, 100%, 46%)",
  "hsl(215, 100%, 49%)",
  "hsl(215, 100%, 52%)",
  "hsl(215, 100%, 56%)",
  "hsl(215, 100%, 60%)",
  "hsl(215, 100%, 65%)",
  "hsl(215, 100%, 70%)",
  "hsl(215, 100%, 75%)",
],
blue = blue.reverse()
const mantineTheme = {
  colors: {
    blue: blue
  },
  primaryColor: "blue",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
    <NotificationsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
