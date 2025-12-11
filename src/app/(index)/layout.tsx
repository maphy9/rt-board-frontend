"use client";

import { Provider } from "react-redux";
import "./index.css";
import React, { ReactNode } from "react";
import { store } from "@/state/store";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
