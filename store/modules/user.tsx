import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface User{
    email:string,
    refreshToken:string,
    uid:string,
}

const userSlice=createSlice({
    name: "USER",
    initialState:{
        data:{
            email:'',
            refreshToken:'',
            uid:'',
        },
        isLoggedIn:false,
    },
    reducers:{
        LOGIN: (state, action: PayloadAction<User>) =>{
            const { email, refreshToken, uid } = action.payload;
            state.data.email = email;
            state.data.refreshToken=refreshToken;
            state.data.uid=uid;
            state.isLoggedIn = true;
        },
        LOGOUT: (state)=>{
            state.data.email='';
            state.data.refreshToken='';
            state.data.uid='';
            state.isLoggedIn=false;
        }
    }
})

export const {LOGIN, LOGOUT} = userSlice.actions;
export default userSlice.reducer;