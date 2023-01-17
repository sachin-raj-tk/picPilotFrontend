import axios from "axios";

// const API = axios.create({baseURL: "http://localhost:5000"})

const URL = process.env.DOMAIN_URL
const API = axios.create({baseURL: URL})

export const userChats = (id) => API.get(`/chat/${id}`)

export const createChats = (userId,followingId) => API.post('/chat',{senderId:userId,receiverId:followingId})

export const getThisChat = (newUserfromProfileMessageButton,currentUserId) => API.get(`/chat/find/${newUserfromProfileMessageButton}/${currentUserId}`)