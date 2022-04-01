import {  Action, ThunkDispatch, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";


const reducer = (state:any, action:any) => {
  if (action.type == HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    // 여기에 추가
  })(state, action);
};

export type RootState = ReturnType<typeof reducer>;
export type ThunkDispatchType = ThunkDispatch<RootState, void, Action>;
export default reducer;
//test