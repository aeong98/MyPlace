import '../styles/globals.scss'
import React, {useState} from "react";
import type { AppProps } from 'next/app';
import {wrapper} from '../store';
import Head from 'next/head';
import Script from 'next/script';
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

  const kakaoLink=`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY_KAKAO}&libraries=services,clusterer,drawing`;
  console.log(process.env.NEXT_PUBLIC_API_KEY_KAKAO)


  return (
    <>
      <Head>
        <script type="text/javascript" src={kakaoLink}></script>
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
