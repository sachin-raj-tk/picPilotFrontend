import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSid from '../../components/profileSide/ProfileSid'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

export const Home = () => {
  const showSaved = "home"
  return (
  <div className="Home">
    <div className='home-left'>

    <ProfileSid/>
    </div>
    <div className='home-center'>
    <PostSide showSaved={showSaved}/>
    </div>
    <div className='home-right'>
    <RightSide/>
    </div>
  </div>
    )
}

export default Home