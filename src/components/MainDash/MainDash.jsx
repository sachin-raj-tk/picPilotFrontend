import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../api/UserRequest'
import Table from '../Table/Table'
// import Cards from '../Cards/Cards'
import './MainDash.css'

const MainDash = () => {
   const {user} = useSelector((state)=>state.authReducer.authData)
   const [usersData,setUsersData] = useState([])
   const [userActive,setuserActive] = useState(false)
  useEffect(()=>{
     const fetchUsersData = async() =>{
        const users = await getAllUser()
        setUsersData(users.data.filter((userData)=>userData._id !== user._id))
      }
      fetchUsersData()
      console.log('woring ano useeffect maindash')
   },[userActive])
   console.log(usersData,'evide usersdata')
  return (
    
    <div className="MainDash">
        {/* <h1>Dashboard</h1> */}
        {/* <Cards/> */}
        <div className='usersTable'>
        <h3>All users</h3>
        <Table usersData={usersData} setuserActive={setuserActive} />
        </div>
    </div>
  )
}

export default MainDash