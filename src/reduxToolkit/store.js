import { configureStore } from "@reduxjs/toolkit";
import LoginSlice  from './LoginSlice/loginSlice'
import fileSlice from './FilesSlice/filesSlice'
const store = configureStore({
    reducer:{
        login:LoginSlice,
        files:fileSlice
    }
})
export default store