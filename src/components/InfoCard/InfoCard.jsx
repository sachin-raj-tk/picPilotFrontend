import React from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams ,useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../actions/AuthAction'
import Comment from '../../img/comment.png'
const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const profileUserId = params.id
    const profileUser = useSelector((state)=>state.userReducer.userData)
    const {user} = useSelector((state)=>state.authReducer.authData)
    const goToChat = (e) =>{
        e.preventDefault()
        navigate('/chat',
            {state:{data:profileUser}}
         )
    }

    // useEffect(()=>{
    //     const fetchProfileUser = async()=> {
    //         if(profileUserId === user._id){
    //             setProfileUser(user)
                
    //         }else{
    //             const profileUser = await UserApi.getUser(profileUserId)
    //             setProfileUser(profileUser)
                
    //         } 
    //     }
    //     fetchProfileUser();
    // },[user])
    const handleLogOut =() =>{
           dispatch(logOut())
    }
  return (
     <div className="InfoCard">
        <div className="infoHead">
            <h4>Profile Info</h4>
            {params.id === user._id ? (
            <div>
              <UilPen width='2rem' height='1.2rem' onClick={()=>setModalOpened(true)} />
            <ProfileModal modalOpened = {modalOpened} setModalOpened={setModalOpened} data ={user} />
            </div>
            ) : (
                <img onClick={(e)=>goToChat(e)} src={Comment} alt="" />
            )}
        </div>

        <div className="info">
            <span>
                <b>Status</b>
            </span>
            <span> {profileUser.relationship}</span>
        </div>
        <div className="info">
            <span>
                <b>Lives in</b>
            </span>
            <span> {profileUser.livesin}</span>
        </div>
        <div className="info">
            <span>
                <b>Works at</b>
            </span>
            <span> {profileUser.worksAt}</span>
        </div>
        {/* {params.id === user._id &&
        
         
        <button className="button logout-button" onClick={handleLogOut}>Logout</button>
        
        } */}
     </div>
    )
}

export default InfoCard