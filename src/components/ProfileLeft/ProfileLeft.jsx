import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { sendVerifiyRequest } from '../../actions/userAction'

import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import '../profileSide/ProfileSid.css'

const ProfileLeft = () => {
  const {user} = useSelector((state)=>state.authReducer.authData)
  const dispatch = useDispatch()
  const sendVerificationRequest=async()=>{
    
    await dispatch(sendVerifiyRequest(user._id)) 
  }
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
    {
        user.followers.length >=3 && user.isFamous === "notFamous" && params.id === user._id?
        <span className='verifyRequest' onClick={sendVerificationRequest}>Want to be verified ? Apply now </span>:
        user.followers.length >=3 && user.isFamous === "pending" && params.id === user._id?
        <span className='verifyRequestSend'>Verify request Send. Please be patient</span>:""

        
    }
    <FollowersCard locality="ProfileSid"/>
   </div>
    )
}

export default ProfileLeft