"use client";

import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import "./globals.css";
const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={rubik.className}>{children}</body>
      </html>
    </Provider>
  );
}
