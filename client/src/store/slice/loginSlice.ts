
import type { Blog } from "@/vite-env";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    isLoggedIn:boolean,
    allBlog:Blog[],
    input:string,
}

const initialState:LoginState = {
  isLoggedIn:false,
  allBlog:[],
  input:''
}

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        updateIsLogin:(state,action:PayloadAction<LoginState["isLoggedIn"]>) => {
           state.isLoggedIn = action.payload;
        },
        updateAllBlogs:(state,action:PayloadAction<LoginState["allBlog"]>) => {
            state.allBlog = action.payload;
        },
        inputText:(state,action:PayloadAction<string>)=>{
              state.input = action.payload;
        }
    }
})

export default loginSlice.reducer;
export const {updateIsLogin,updateAllBlogs,inputText} = loginSlice.actions;