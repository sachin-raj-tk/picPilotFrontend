import React, { useState } from 'react'
import './AdminPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainDash from '../../components/MainDash/MainDash'

const AdminPage = () => {
  const [mainDashItem,setMainDashItem] = useState(0)
  return (
       <div className="adminPage">
        <div className='AppGlass'>
          <Sidebar setMainDashItem={setMainDashItem}/>
          <MainDash mainDashItem={mainDashItem}/>
        </div>
       </div>
    )
}

export default AdminPage