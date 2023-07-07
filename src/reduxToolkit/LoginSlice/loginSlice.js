import { createSlice } from "@reduxjs/toolkit";
import { createUserAndProfileAsync } from "../extraReducer";


const initialState= {
    loading:false,
    loginOnSuccess:"",
    loggedIn: "",
    error:"",
    loginResponseError:null,
    bodyErrors:null
}

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
		
    }
})
export default loginSlice.reducer