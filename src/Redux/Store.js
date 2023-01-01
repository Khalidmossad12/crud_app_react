import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";

export let store = configureStore({
    reducer:{
        posts:postsSlice
    },
})