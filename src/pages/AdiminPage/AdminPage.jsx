import React from 'react'
import './AdminPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainDash from '../../components/MainDash/MainDash'

const AdminPage = () => {
  return (
       <div className="adminPage">
        <div className='AppGlass'>
          <Sidebar/>
          <MainDash/>
        </div>
       </div>
    )
}

export default AdminPage