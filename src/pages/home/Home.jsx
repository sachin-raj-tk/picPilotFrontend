import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSid from '../../components/profileSide/ProfileSid'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

export const Home = () => {
  return (
  <div className="Home">
    <ProfileSid/>
    <PostSide/>
    <RightSide/>
  </div>
    )
}

export default Home