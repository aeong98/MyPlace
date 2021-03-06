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
    status:'false',
    map:[],
}


const mapSlice=createSlice({
    name:"MAP",
    initialState:initialState,
    reducers:{
        INITIALIZE:(state, action)=>{
            state.map=action.payload.map;
        },
        SEARCH : (state,action:PayloadAction<Place>)=>{
            // TODO : 초기화 필요 (불변경 지키지 않음)
            state.data=action.payload;
            state.status='click';
        },
        CLEAR: (state)=>{
            state=initialState;
        },
        CLEARMAP:(state)=>{
            state.map=[];
            state.status='false';
        }
    }
})

export const {INITIALIZE, SEARCH, CLEAR, CLEARMAP} = mapSlice.actions;
export default mapSlice.reducer;