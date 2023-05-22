import { createSlice } from "@reduxjs/toolkit";

export interface userInterface {
    userInfo:string | null;
}

const storedUserInfo = localStorage.getItem('userInfo');

const initialState:userInterface= {
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state , action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, _action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const {setCredentials , logout} = authSlice.actions
export default authSlice.reducer
