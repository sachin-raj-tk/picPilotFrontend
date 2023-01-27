import React from 'react'
import { useState } from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'

const PostSide = ({showSaved}) => {
  const [savedPosts,setSavedPosts] = useState(0)
  // const handleAllPosts =()=>{
  //   setSavedPosts(0)
  // }
  // const handleSavedPosts = ()=>{
  //   setSavedPosts(1)
  // }

  // const handleMyPosts
  console.log(savedPosts,'postside.jsx');
  return (
   <div className="PostSide">
    <PostShare/>
    {
      showSaved==="home" &&
      <div className='switchPostsButton'>
    <button onClick={()=>setSavedPosts(0)} className={savedPosts===0?"activeButton buttonItem":"buttonItem"}><span>All Posts</span></button>
         <button onClick={()=>setSavedPosts(1)} className={savedPosts===1?"activeButton buttonItem":"buttonItem"}>Saved Posts</button>
         <button onClick={()=>setSavedPosts(2)} className={savedPosts===2?"activeButton buttonItem":"buttonItem"}>My Posts</button>
      </div>
    }
    <Posts savedPosts={savedPosts}/>
   </div>
    )
}

export default PostSide