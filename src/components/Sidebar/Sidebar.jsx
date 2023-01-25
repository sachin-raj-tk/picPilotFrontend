import React from 'react'
import './Sidebar.css'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import { SidebarData } from '../../Data/SidebarData'
import Logo from '../../img/logo.png'
import { useState } from 'react'
import { logOut } from '../../actions/AuthAction'
import { useDispatch } from 'react-redux'


const Sidebar = () => {
  const dispatch = useDispatch()
  const handleLogOut =() =>{
    dispatch(logOut())
}
  
  const [selected,setSelected] = useState(0)

  return (
    <div className="Sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={Logo} alt="" />
        <span>Pic<span>Pi</span>lot</span>
      </div>
      {/* menu */}
      <div className="menu">
        {
          SidebarData.map((item, index) => {
            return (
              
              <div className={selected === index ?"menuItem active":"menuItem"} key={index} onClick={()=>setSelected(index)}>
                <span>

                <item.icon />
                </span>
                <span>
                  {item.heading}
                </span>
               
              </div>
              
            )
          })
        }
        <div className="menuItem" onClick={handleLogOut}>
          <UilSignOutAlt />
        </div>

      </div>
    </div>
  )
}

export default Sidebar