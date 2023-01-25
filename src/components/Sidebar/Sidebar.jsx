import React from 'react'
import './Sidebar.css'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import { SidebarData } from '../../Data/SidebarData'
import Logo from '../../img/logo.png'
import { useState } from 'react'


const Sidebar = () => {
  
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
        <div className="menuItem">
          <UilSignOutAlt />
        </div>

      </div>
    </div>
  )
}

export default Sidebar