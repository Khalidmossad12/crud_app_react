import { createSlice } from "@reduxjs/toolkit";


export let PostsSlice = createSlice({
    name:'posts',
    initialState:{
        items: []
    },
    reducers:{
        addPost: function(state , action){
            console.log(action);
            state.items.push(action.payload)
        }, 
        deletePost: function(state,action){
            state.items = state.items.filter(item => item.id != action.payload.id)
        },
        updatePost: function(state, action){
            state.items.map(item =>{
                if (item.id == action.payload.id) {
                    item.title =  action.payload.title;
                    item.desc =  action.payload.desc;
                }       
            })
        }
    },
})

export let {addPost , deletePost , updatePost} = PostsSlice.actions
export default PostsSlice.reducer   