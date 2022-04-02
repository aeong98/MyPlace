import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// const {kakao} = window;

export interface Place{
    address_name: string,
    category_group_code: string,
    category_group_name: string,
    category_name: string,
    distance: string,
    id:number,
    phone: string
    place_name: string
    place_url: string
    road_address_name: string
    x: string,
    y: string
}

const initialState={
    data:{
        address_name: '',
        category_group_code: '',
        category_group_name: '',
        category_name: '',
        distance: '',
        id:0,
        phone: '',
        place_name: '',
        place_url: '',
        road_address_name: '',
        x: 0,
        y: 0
    },
    map:[],
    ps:[],
}
const mapSlice=createSlice({
    name:"MAP",
    initialState:initialState,
    reducers:{
        INITIALIZE:(state, action)=>{
            state.map=action.payload.map;
            state.ps=action.payload.ps;
        },
        SEARCH : (state,action:PayloadAction<Place>)=>{
            state.data=action.payload;
        },
        CLEAR: (state)=>{
            state=initialState;
        }
    }
})

export const {INITIALIZE, SEARCH, CLEAR} = mapSlice.actions;
export default mapSlice.reducer;