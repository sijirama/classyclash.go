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
    reducers:{}
})
