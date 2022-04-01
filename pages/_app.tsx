import '../styles/globals.scss'
import React, {useState} from "react";
import type { AppProps } from 'next/app';
import {wrapper} from '../store';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {

  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  queryClientRef.current.setDefaultOptions({
    queries: {
      staleTime: Infinity,
    },
  });


  return (
    <>
      <Head>
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}


export default wrapper.withRedux(MyApp);
