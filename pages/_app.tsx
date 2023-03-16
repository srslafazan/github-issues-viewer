import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header";
import { RepoSearchProvider } from "@/context/RepoContext";
import { IssueProvider } from "@/context/IssueContext";
import "normalize.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RepoSearchProvider>
        <IssueProvider>
          <Header />
          <Component {...pageProps} />
        </IssueProvider>
      </RepoSearchProvider>
    </>
  );
}
