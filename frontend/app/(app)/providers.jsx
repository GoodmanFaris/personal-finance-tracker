"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline } from "@mui/material";

export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <CssBaseline />
      {children}
    </AppRouterCacheProvider>
  );
}
