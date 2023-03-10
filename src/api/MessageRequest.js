import axios from 'axios'

// const API = axios.create({baseURL: "http://localhost:5000"})

const phase = process.env.REACT_APP_PHASE
const URL = phase === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL;
const API = axios.create({baseURL: URL})


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
        
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        
    }

    return req
})


export const getMessages = (id) =>API.get(`/message/${id}`)

export const addMessage = (data) =>API.post('/message/',data)