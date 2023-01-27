import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTimelinePosts } from '../../actions/postAction'
import { followUser, getUser, unFollowUser } from '../../actions/userAction'

const User = ({person,list,id}) => {
  const dispatch = useDispatch()
  const {user} =useSelector((state)=>state.authReducer.authData)
  const [following, setFollowing] = useState(person.followers.includes(user._id))

  const phase = process.env.REACT_APP_PHASE
  const FOLDER = phase === "testing" ? process.env.REACT_APP_PUBLIC_FOLDER_TESTING : process.env.REACT_APP_PUBLIC_FOLDER;

  const serverPublic = FOLDER
  const handleFollow = ()=>{
    following?
    dispatch(unFollowUser(person._id,user)):
    dispatch(followUser(person._id,user));
    dispatch(getTimelinePosts(user._id))
    setFollowing((prev)=>!prev)
    
  }
  const setUser = ()=>{
    dispatch(getUser(person._id))
    
  }
  useEffect(()=>{
    const followingStatus=()=>{
      list === "people"?setFollowing(false):user.following.includes(person._id) || list === "followingPeople"?setFollowing(true):setFollowing(false);
    }
    followingStatus()
  },[user])
  
  return (
    <div className="follower" id={id}>
              <div>
                <img src={person.profilePicture? serverPublic + person.profilePicture : serverPublic + "defaultProfileImg.jpg"} alt="" className="followerImage" />
                <div className="name">
                <Link onClick={setUser} style={{textDecoration:"none", color : "inherit"}} to={`/profile/${person._id}`}>
                {person.firstname}
                </Link>
                <span>{person.username.split('.',1)}</span>
                
                </div>
                
              </div>
              <button className={following? "button fc-button UnfollowButton":"button fc-button"} onClick={handleFollow}>
                  {following? 'Unfollow':'Follow'}
              </button>
            </div>
  )
}

export default User