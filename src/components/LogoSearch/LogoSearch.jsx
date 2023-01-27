import React, { useEffect, useState } from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
import { getUserData } from '../../api/UserRequest'
import { Link } from 'react-router-dom'
import { getUser } from '../../actions/userAction'
import { useDispatch } from 'react-redux'

const LogoSearch = ({setNewUser,place}) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  
  // const [user,setUser] = useState(null)
  // useEffect(()=>{
  //   const fetchUser=async()=>{
  //     dispatch(getUser(user._id))
  //   }
  //   fetchUser()
  // },[user])
  
  const setUser = (person)=>{
    dispatch(getUser(person._id))
    
  }

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getUserData(query);
      console.log(data,'kitti')
      setData(data);
    };
    if ( query.length >=1) fetchData();
    
  }, [query]);

  return (
    
  <div className="LogoSearch dropdown">
    
    <img src={Logo} alt="" />
    <div className="Search">
        <input type="text"  placeholder='#Explore' onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
        <div className="s-icon">
            <UilSearch/>
        </div>
    </div>
    <div className="dropdown-content">
      {place === "chatPage" ?data.map((person)=>(
        <>
      <p onClick={()=>setNewUser(person)} style={{cursor:"pointer"}}>{person.firstname}</p>
      <hr />
      </>
      )):
        
      data.map((person)=>(
        <>
      <Link key={person._id} onClick={()=>setUser(person)} style={{textDecoration:"none", color : "inherit"}} to={`/profile/${person._id}`}>
                {person.firstname}
                </Link>
      <hr />
      </>
      )) 

      }
    
    
  </div>
  </div>
    )
}
    
export default LogoSearch