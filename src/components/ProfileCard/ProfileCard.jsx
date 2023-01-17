import React from 'react'
import './ProfileCard.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../actions/userAction'


const ProfileCard = ({location,person}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    const posts = useSelector((state)=>state.postReducer.posts)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const dispatch = useDispatch()
    const setUser=()=>{
        dispatch(getUser(user._id))
    }
    
  return (
    <div className="ProfileCard">
        <div className="ProfileImages">
            <img src={person?.coverPicture? serverPublic+ person.coverPicture: !person && user.coverPicture? serverPublic + user.coverPicture : serverPublic +  "cover.jpg"} alt="" />
            <img src={person?.profilePicture?serverPublic+ person.profilePicture: !person && user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultProfileImg.jpg"} alt="" />
        </div>
        <div className="ProfileName">
            <span>{person?.firstname?person.firstname:!person && user.firstname? user.firstname:'firstname'} {person?.lastname?person.lastname:!person && user.lastname? user.lastname:''}</span>
            <span>{person?.worksAt? person.worksAt :!person && user.worksAt? user.worksAt : "Write about yourself"}</span>
        </div>
        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>{person?.following?person.following.length:user.following.length}</span>
                    <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{person?.followers?person.followers.length:user.followers.length}</span>
                    <span>Followers</span>
                </div>

                {
                    location==="profilePage" && (
                        <>
                        <div className="vl">

                        </div>
                        <div className="follow">
                            <span>{posts.filter((post)=>post.userId === person?._id).length}</span>
                            <span>Posts</span>
                        </div>
                        </>
                    )
                }
            </div>
            <hr />
        </div>
        {location==='profilePage' ? '' :<span>
            <Link style={{textDecoration:"none", color : "inherit"}} to={`/profile/${user._id}`} onClick={setUser}>
            My Profile
            </Link>
        </span> }
        
    </div>
    )
}

export default ProfileCard