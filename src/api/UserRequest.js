import axios from 'axios'

// const API = axios.create({baseURL: "http://localhost:5000"})

const phase = process.env.REACT_APP_PHASE
const URL = phase === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL;
const API = axios.create({baseURL: URL})


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile'))
    {
        //const tokenVar = JSON.parse(localStorage.getItem('profile')).token
         //console.log(tokenVar);
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
         //console.log(`Bearer ${localStorage.getItem('profile').u}`);
    }

    return req
})

export const getUser = (userId) => API.get(`/user/${userId}`)

export const updateUser = (id, formData) =>API.put(`/user/${id}`, formData)

export const getAllUser = () => API.get('/user')

export const followUser =  (id,data) => API.put(`/user/${id}/follow`, data)

export const unFollowUser =  (id,data) => API.put(`/user/${id}/unfollow`, data)

export const getUserData = (query) => API.post(`/user/getdata`,{data:query})

export const blockUser = (id,active) => API.post(`/user/blockuser/${id}`,{data:active})
