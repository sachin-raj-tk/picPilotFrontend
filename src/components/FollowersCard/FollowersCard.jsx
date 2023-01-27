import React from 'react'
import './FollowersCard.css'

import User from '../User/User'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../api/UserRequest'
import Pagination from '../Pagination/Pagination'
const FollowersCard = ({locality}) => {
  const[persons, setPersons] = useState([])
  const {user} = useSelector((state)=>state.authReducer.authData)
  const [currentFollowingPage,setCurrentFollowingPage] = useState(1)
  const [currentFollowersPage,setCurrentFollowersPage] = useState(1)
  const [currentPeopleYouMayKnowPage,setCurrentPeopleYouMayKnowPage] = useState(1)
  
  const [personsPerPage] = useState(1)
  


  
  

  
  
  useEffect(()=>{
    const fetchPersons = async()=>{
      const {data} = await getAllUser();
      setPersons(data)
      console.log(persons,'hai followerscard');
    }
    fetchPersons()
  },[])
  
  const followersArray = persons.filter((person)=>user.followers.includes(person._id))
  const followingArray = persons.filter((person)=>user.following.includes(person._id))
  const personsArray = persons.filter((person)=>!user.following.includes(person._id) && !user.followers.includes(person._id) && person._id !== user._id)
  console.log(personsArray,'hi again followerscard');


  //get following list by pagination
  const indexofLastFollowingPerson = currentFollowingPage * personsPerPage
  const indexofFirstFollowingPerson = indexofLastFollowingPerson - personsPerPage
  const currentFollowingList = followingArray.slice(indexofFirstFollowingPerson,indexofLastFollowingPerson)
  const followingPaginate = (pageNumber) =>{
    setCurrentFollowingPage(pageNumber)
  }
  console.log(currentFollowingList,'followers current')



  //  get followers list by pagination
   const indexofLastFollowersPerson = currentFollowersPage * personsPerPage
   const indexofFirstFollowersPerson = indexofLastFollowersPerson - personsPerPage
   const currentFollowersList = followersArray.slice(indexofFirstFollowersPerson,indexofLastFollowersPerson)
   const followersPaginate = (pageNumber) =>{
      setCurrentFollowersPage(pageNumber)
   }
   

   //  get people you may know list by pagination
   const indexofLastPerson = currentPeopleYouMayKnowPage * personsPerPage
   const indexofFirstPerson = indexofLastPerson - personsPerPage
   const currentPersonsList = personsArray.slice(indexofFirstPerson,indexofLastPerson)
   const personsPaginate = (pageNumber) =>{
    setCurrentPeopleYouMayKnowPage(pageNumber)
   }

  
  return (
    <>
    {locality === "ProfileSid"?
    (
    <div className="FollowersCard">
      <u>
        <h3>People you may know</h3>
         
      </u>
        {currentPersonsList.map((person)=>
          
          (
            <User person = {person}  list="people" id={person._id}/>
          )
        
        )}
    <Pagination peoplePerPage={personsPerPage} totalPersons={personsArray.length} paginate={personsPaginate}/>
    </div>
    )
  :
  (   
    <div className="FollowersCard">
      
        <hr />
        <u><h3>Following</h3> </u>
        {currentFollowingList.map((person)=>
          
          (
            
            <User person = {person}  list="followingPeople" id={person._id}/>
            
            
          )
        
        )}
        <Pagination peoplePerPage={personsPerPage} totalPersons={followingArray.length} paginate={followingPaginate}/>
        

        <hr />
        <u>
        <h3>Followers</h3>

        </u>
        {currentFollowersList.map((person)=>
          
            (
              <User person = {person}  list="followersPeople" id={person._id}/>
              )
            
          )}
          <Pagination peoplePerPage={personsPerPage} totalPersons={followersArray.length} paginate={followersPaginate}/>
         <hr />
    </div>
    )
  }
  </>
  )
}

export default FollowersCard