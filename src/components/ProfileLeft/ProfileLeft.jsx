import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import '../profileSide/ProfileSid.css'

const ProfileLeft = () => {
  const {user} = useSelector((state)=>state.authReducer.authData)
  const params = useParams()
  return (
   <div className="ProfileSid">

    <LogoSearch  place="homeSide"/>
    <InfoCard/>
        { params.id !== user._id &&
        <span>
        <Link style={{textDecoration:"none", color : "inherit"}} to={`/profile/${user._id}`} >
        My Profile
        </Link>
      
    </span>
    }
    <FollowersCard locality="ProfileSid"/>
   </div>
    )
}

export default ProfileLeft