import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { addMessage} from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import './ChatBox.css'
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji'
import { getMessages } from '../../actions/MessageAction'
import { useDispatch } from 'react-redux'
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const scroll = useRef()
    const dispatch = useDispatch()
    const phase = process.env.REACT_APP_PHASE
    const FOLDER = phase === "testing" ? process.env.REACT_APP_PUBLIC_FOLDER_TESTING : process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
        if(receiveMessage !== null && receiveMessage.chatId === chat._id){
            setMessages([...messages,receiveMessage])
        }
    },[receiveMessage])

    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                
            } catch (error) {
                console.log(error);
            }

        }
        if (chat !== null) getUserData()

    }, [chat, currentUser])

    //fetching data for messages
    useEffect(()=>{
        const fetchMessages = async () => {
            try {
                const {data} = await dispatch(getMessages(chat._id)) 
                setMessages(data);
            } catch (error) {
                console.log(error)
            }
        }
        if(chat !== null) fetchMessages();
    },[chat])
    
    const handleChange = (newMessage) =>{
        setNewMessage(newMessage)
    }

    const handleSend = async(e) =>{
        e.preventDefault();
        const message = {
            senderId : currentUser,
            text : newMessage,
            chatId : chat._id
        }

        //send message to database
        try {
            const {data} = await addMessage(message);
            setMessages([...messages,data])
            setNewMessage("")

        } catch (error) {
            
        }

        //send message to socket server
        const receiverId = chat.members.find((id)=>id !== currentUser)
        setSendMessage({...message,receiverId})

    }

    //Always scroll to last message
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    return (
        <>
            <div className="ChatBox-container">
                {chat?( 
                <>
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                
                                <img src={userData?.profilePicture ? FOLDER + userData.profilePicture : FOLDER + 'defaultProfileImg.jpg'} alt="" className='followerImage' style={{ width: '50px', height: '50px' }} />
                                <div className="name" style={{ fontSize: "0.8rem" }}>
                                    <span>{userData?.firstname} {userData?.lastname}</span>
                                    
                                </div>
                            </div>
                        </div>
                        <hr style={{width:'85%', border:'0.1px solid #ececec'}}/>
                    </div>
                    {/* chatbox messages */}
                    <div className="chat-body">
                         {messages.map((message)=>(
                            <>
                             <div ref={scroll} className={message.senderId === currentUser? "message own": "message"}>
                              <span>{message.text}</span>
                              <span>{format(message.createdAt)}</span>
                              </div>
                            </>
                         ))}
                    </div>
                    {/* chat sender */}
                    <div className="chat-sender">
                        <div>+</div>
                        <InputEmoji value={newMessage} onChange ={handleChange}/>
                        <div className="send-button button" onClick={handleSend}>Send</div>
                    </div>
                </>
                ):(
                    <span className="chatbox-empty-message">Tap on a chat to start conversation</span>
                )}
            </div>
        </>
    )
}

export default ChatBox