import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { NextRouter } from "next/router";

// 테스트에 주입할 리듀서 import 
import counter from '../store/modules/counter';
import admin from "../store/modules/admin";
import depthInfo from "../store/modules/depthInfo";
import selected from "../store/modules/selected";
import worst10 from "../store/modules/worst10";
import login from "../store/modules/login";


// 리듀서 주입 
function render(
  ui:any,
  {
    preloadedState,
    store = configureStore({ reducer: {
      counter:counter,
      admin:admin,
      depthInfo:depthInfo,
      selected:selected,
      worst10:worst10,
      login: login
    
  }, preloadedState }),
    ...renderOptions
  }:any= {}
) {
  function Wrapper({ children } :any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };



// 테스트에 router 주입
export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  };
}