import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
import { getUser } from '../../actions/userAction'
const Profile = () => {

    const {user} = useSelector((state)=>state.authReducer.authData)
    const person = useSelector((state)=>state.userReducer.userData)
    const showSaved = "profile"
    
    // const [person,setPerson] = useState({})
    // const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    // useEffect(()=>{
    //     if(id === user._id){
    //         setPerson(user)
    //     }else{
    //         console.log(id);
    //         // dispatch(getUser(id))
    //         setPerson(profileUser)
    //     }
        
    // },[])
    // console.log(profileUser,'profilecard.jsx 1')
    

  return (
    <div className="Profile">
        <div className='profile-left'>

        <ProfileLeft/>
        </div>
        <div className="Profile-center">
            <ProfileCard location="profilePage" person = {id===user._id?user:person}/>
            <PostSide showSaved={showSaved}/>
        </div>
        <div className='profile-right'>

        <RightSide/>
        </div>
    </div>
    )
}

export default Profile