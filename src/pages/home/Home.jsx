import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSid from '../../components/profileSide/ProfileSid'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

export const Home = () => {
  const showSaved = "home"
  return (
  <div className="Home">
    <ProfileSid/>
    <PostSide showSaved={showSaved}/>
    <RightSide/>
  </div>
    )
}

export default Home