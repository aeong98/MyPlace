import {  Action, ThunkDispatch, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import user from './user';
import map from './map';


const reducer = (state:any, action:any) => {
  if (action.type == HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    user,
    map
    // 여기에 추가
  })(state, action);
};

export type RootState = ReturnType<typeof reducer>;
export type ThunkDispatchType = ThunkDispatch<RootState, void, Action>;
export default reducer;
//test