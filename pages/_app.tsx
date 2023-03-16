import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header";
import { RepoSearchProvider } from "@/context/RepoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RepoSearchProvider>
        <Header />
        <Component {...pageProps} />
      </RepoSearchProvider>
    </>
  );
}
