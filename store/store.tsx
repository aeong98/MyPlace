import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

import reducer from "./modules";


const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(logger),
  devTools: !["production", "test"].includes(process.env.NODE_ENV),
});

export default store;