import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './slice/loginSlice'
import api from './slice/api'

export const store = configureStore({
    reducer:{
        loginSlice,
         [api.reducerPath]:api.reducer
    },
     middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;