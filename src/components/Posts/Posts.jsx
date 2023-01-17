import React from 'react'
import { useEffect } from 'react'
import Post from '../Post/Post'
import{useSelector,useDispatch} from 'react-redux'
import './Posts.css'
import { getTimelinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.authReducer.authData)
  
  let {posts,loading} = useSelector((state)=>state.postReducer)
  const postReducer = useSelector((state)=>state.postReducer)
  console.log(JSON.stringify(postReducer),'posts.jsx')
  const params = useParams()
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))

  },[])
  
  if(!posts) return "no posts";
  if(params.id) posts = posts.filter((post)=> post.userId === params.id)
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