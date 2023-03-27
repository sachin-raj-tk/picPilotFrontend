import React from 'react'
import { useEffect } from 'react'
import Post from '../Post/Post'
import{useSelector,useDispatch} from 'react-redux'
import './Posts.css'
import { getTimelinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'

const Posts = ({savedPosts}) => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.authReducer.authData)
  
  let {posts,loading} = useSelector((state)=>state.postReducer)
  
  posts = posts.filter((post)=>post.removed===false)
  
  const postReducer = useSelector((state)=>state.postReducer)
  const params = useParams()
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))

  },[])
  
  if(!posts) return "no posts";
  if(params.id) posts = posts.filter((post)=> post.userId === params.id)
  if(savedPosts===2) posts = posts.filter((post)=> post.userId === user._id)
  if(savedPosts===1) posts = posts.filter((post)=> user.savedposts.includes(post._id))
  return (
     <div className="Posts">
        {loading?"Fetching posts...":
            posts.map((post,id)=>{
                return <Post data={post} id={id}/>
            })
            
            
        }
     </div>
    )
}

export default Posts