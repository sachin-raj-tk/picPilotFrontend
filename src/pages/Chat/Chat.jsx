import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getThisChat} from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import './Chat.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import ChatBox from '../../components/ChatBox/ChatBox'
import {io} from 'socket.io-client'
import { createChats, userChats } from '../../actions/ChatAction.js'

const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const location = useLocation()
    const newUserfromProfileMessageButton = location?.state?.data
    const [chats, setChats] = useState([])
    const [newUser,setNewUser] = useState(null)
    const [currentChat,setCurrentChat] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const [sendMessage,setSendMessage] = useState(null)
    const [receiveMessage,setReceiveMessage] = useState(null)
    const [changeChat,setChangeChat] = useState(false) 
    const socket = useRef()
    const dispatch = useDispatch()

    const phase = process.env.REACT_APP_PHASE
    const socketurl = phase === "testing"? process.env.REACT_APP_SOCKET_URL_TESTING: process.env.REACT_APP_SOCKET_URL;


    //send message to socket server
    useEffect(() => {
       if(sendMessage !== null){
        socket.current.emit('send-message', sendMessage)
       }
    },[sendMessage])
    
    

   

    useEffect(() => {
      socket.current = io(socketurl)
      socket.current.emit("new-user-add", user._id)
      socket.current.on('get-users',(users)=>{
        setOnlineUsers(users);
        
      })
    },[user])

    useEffect(()=>{
        const createCht=async()=>{
        if(newUser !== null && user._id !== newUser._id){
          await dispatch(createChats(user._id,newUser._id))
          
          
        }
        }
        createCht()
    },[newUser])

    // receive message from socket server
    useEffect(()=>{
        socket.current.on("receive-message",(data)=>{
            setReceiveMessage(data)
        })
    },[])

    useEffect(() => {
        const getChats = async () => {
            try {
                const  {data}  =  await dispatch(userChats(user._id))
                setChats(data)
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    }, [user,newUserfromProfileMessageButton,newUser,changeChat])
    

//   create new chat when clicked message from profile page of another user
    useEffect(()=>{
        const changeNewUser = async() =>{
         setNewUser(newUserfromProfileMessageButton)
         const setThisAscurrentChat = await getThisChat(newUserfromProfileMessageButton._id,user._id)
         setCurrentChat(setThisAscurrentChat.data)
         if(setThisAscurrentChat){setChangeChat(true)}
        }
        changeNewUser() 
     },[newUserfromProfileMessageButton,chats])

    
    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member)=> member !== user._id)
        const online = onlineUsers.find((user)=>user.userId === chatMember)
        return online ? true: false
    }
    

    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <LogoSearch setNewUser={setNewUser} place="chatPage"/>
                <div className="Chat-container">

                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div onClick={()=>setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="Right-side-chat">
                <div style={{width:'20rem',alignSelf:'flex-end'}}>
                    <div className="navIcons">
                        <Link to='../home'>
                            <img src={Home} alt="" />
                        </Link>
                        {/* <UilSetting /> */}
                        {/* <img src={Noti} alt="" /> */}
                        <Link to="../chat">
                            <img src={Comment} alt="" />
                        </Link>
                    </div>


                </div>
                    {/* chat body */}
                    <ChatBox chat = {currentChat} currentUser = {user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>
            </div>
        </div>
    )
}

export default Chat