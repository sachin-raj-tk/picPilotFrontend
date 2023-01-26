import React from 'react'
import { useSelector } from 'react-redux'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSid.css'

const ProfileSid = () => {
   
  return (
    <div className="ProfileSid">
        <LogoSearch/>
        <ProfileCard location="homepage"/>

        <FollowersCard locality="ProfileSid" />
    </div>
    )
}

export default ProfileSid