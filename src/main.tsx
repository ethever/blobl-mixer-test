import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { materialTheme } from "./theme.ts";
import { CssBaseline, GlobalStyles } from "@mui/joy";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              height: "100vh",
            },
            "#root": {
              height: "100%",
            },
          }}
        />
        <App />
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  </React.StrictMode>
);
