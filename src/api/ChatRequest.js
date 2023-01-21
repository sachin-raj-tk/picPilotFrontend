import axios from "axios";

// const API = axios.create({baseURL: "http://localhost:5000"})

const phase = process.env.REACT_APP_PHASE
const URL = phase === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL;
const API = axios.create({baseURL: URL})

export const userChats = (id) => API.get(`/chat/${id}`)

export const createChats = (userId,followingId) => API.post('/chat',{senderId:userId,receiverId:followingId})

export const getThisChat = (newUserfromProfileMessageButton,currentUserId) => API.get(`/chat/find/${newUserfromProfileMessageButton}/${currentUserId}`)