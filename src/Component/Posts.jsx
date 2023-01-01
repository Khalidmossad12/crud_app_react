import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost , updatePost } from '../Redux/postsSlice';

export default function Posts() {

  // Add Post
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  // Update Post
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateDesc, setUpdateDesc] = useState("")

  const [edit , setEdit] = useState(false)
  const [id, setId] = useState(null)

  const posts = useSelector((state)=> state.posts.items)
 
  let dispatch = useDispatch()

  // Read from local storage
  const ReadDataFromStorage  = (itemKey = "ourPost" , resType="json")=>{
    let data = localStorage.getItem(itemKey) ;
    if(resType == "json"){
       try {
            data = JSON.parse(data)||[];
        } catch  {
            data = []
        }
    }
    return data 
   }

  //  write from local storage
    const WriteDataToStorage = (data , itemKey="ourPost")=>{    
        localStorage.setItem(itemKey , JSON.stringify(data))
    }


    // Add Post 
  function AddPost(){
    if (title === "" && desc === "") {
      console.log("please enter title or Description");
    }else{
      let dispathPost = {id: posts.length+1, title : title, desc: desc}
      dispatch(addPost(dispathPost));
      setTitle("");
      setDesc("");

      const allPosts = ReadDataFromStorage()
      allPosts.push(dispathPost)
      WriteDataToStorage(allPosts)
    }
    
  }

  // Update Post
  function UpdatePost(id){
    const newPost = {id:id , title : updateTitle , desc : updateDesc}
    dispatch(updatePost(newPost))
    setEdit(false)

    // const allPosts = ReadDataFromStorage()
    //allPosts[id] = newPost    
    // WriteDataToStorage()
    // console.log(newPost);
     
  }

  // const posts = ReadDataFromStorage()
  return (
    <div>
      <div className='head'>
        <h1>Redux Toolkit Crud App</h1>
      </div>
      <form className='form'>      
        <input id='title' onChange={(e)=>setTitle(e.target.value)} type="text" value={title} placeholder="Enter Post Title" required />
        
        <input id='desc' onChange={(e)=>setDesc(e.target.value)} type="text" value={desc} placeholder="Enter Post Desc" required />

         <button onClick={()=>AddPost()}>Add Post</button>
      </form>

      <div className='posts'>
        {posts.length > 0 ? posts.map((post , i)=> <div key={i} className='post'>
          <h2 className='text-center'>{post.title}</h2>
          <p className='text-center'> {post.desc}</p>
          <button onClick={()=> {setEdit(true); setId(post.id)}}>Edit</button>
          <button onClick={() =>  dispatch(deletePost({id: post.id})) }>Delete</button>
          <br />
          {edit && id == post.id && (
            <>
              <input onChange={(e)=>{setUpdateTitle(e.target.value)}} className='mx-1' type="text" placeholder='Updated title'/>
              <input onChange={(e)=>{setUpdateDesc(e.target.value)}} type="text" placeholder='Updated Description'/>
              <button onClick={()=>UpdatePost(id)}>Update</button>
            </>
          )}
        </div>):
        <div className="empty">
          <h2>there is no posts</h2>
        </div>
        }
        
      </div>
    </div>
  )
}
