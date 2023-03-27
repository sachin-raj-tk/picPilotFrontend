import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser} from '../../api/UserRequest'
import Table from '../Table/Table'
import ReportedPosts from '../ReportedPosts/ReportedPosts'
// import Cards from '../Cards/Cards'
import './MainDash.css'

import AdminNotifications from '../AdminNotifications/AdminNotifications'
import { getReportedPosts } from '../../actions/postAction'
import { getVerifyNotifications } from '../../actions/userAction'

const MainDash = ({mainDashItem}) => {
  const dispatch = useDispatch()
   const {user} = useSelector((state)=>state.authReducer.authData)
   const [usersData,setUsersData] = useState([])
   const [userActive,setuserActive] = useState(false)
   const [allReportedPosts,setAllReportedPosts] = useState([])
   const [allVerifyNotifications,setAllVerifyNotifications] = useState([])
   const [isFamousMadeTrue,setIsFamousMadeTrue] = useState(false)
   const [reportedPostsUseEffect,setReportedPostsUseEffect] = useState(false)
  useEffect(()=>{
     const fetchUsersData = async() =>{
        const users = await getAllUser()
        setUsersData(users.data.filter((userData)=>userData._id !== user._id))
      }
      fetchUsersData()
   },[userActive])


   useEffect(()=>{
    const fetchPostData = async() =>{
      const posts = await dispatch(getReportedPosts()) 
      setAllReportedPosts(posts.data)
    }
    fetchPostData()
    
  },[reportedPostsUseEffect])

   

  useEffect(()=>{
    const fetchVerifyNotifications=async()=>{
    const verifyNotifications = await dispatch(getVerifyNotifications()) 
    setAllVerifyNotifications(verifyNotifications.data)
   }
   fetchVerifyNotifications()
  },[mainDashItem,isFamousMadeTrue])
  
  return (
    
    <div className="MainDash">
        {/* <h1>Dashboard</h1> */}
        {/* <Cards/> */}
        {
          mainDashItem === 0 &&
        <div className='NotificationsAcordian'> 
          <h3>Notifications</h3>
          {allVerifyNotifications.length > 0 ?
          <AdminNotifications allVerifyNotifications={allVerifyNotifications} setIsFamousMadeTrue={setIsFamousMadeTrue} reportedPostsUseEffect={reportedPostsUseEffect}/>:
          <span>No new verification requests yet</span>
          }
        </div>
        }
        {mainDashItem === 1 &&
        <div className='usersTable'>
        <h3>All users</h3>

        <Table usersData={usersData} setuserActive={setuserActive} />
        </div>
        }
        {
          mainDashItem === 2 &&
           <div className="reportedPostsTable">
              <h3>Reported Posts</h3>
              <ReportedPosts allReportedPosts={allReportedPosts} setReportedPostsUseEffect={setReportedPostsUseEffect} />
           </div>
        }
    </div>
  )
}

export default MainDash