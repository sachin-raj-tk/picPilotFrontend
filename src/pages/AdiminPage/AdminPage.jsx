import React from 'react'
import './AdminPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import AdminCenter from '../../components/AdminCenter/AdminCenter'

const AdminPage = () => {
  return (
       <div className="adminPage">
        <div className='AppGlass'>
          <Sidebar/>
          <AdminCenter/>
        </div>
       </div>
    )
}

export default AdminPage