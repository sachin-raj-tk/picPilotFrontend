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



export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`)

export const likePost = (id,userId) => API.put(`post/${id}/like`,{userId: userId})

export const addComment = (id,comment) => API.put(`/post/${id}/comment`,comment)

export const deleteComment =(id,commentId) => API.post(`/post/${id}/deleteComment`,{commentId:commentId})

export const deletePost = (id,currentUser) => API.post(`/post/${id}/delete`,{currentUser:currentUser})

export const ReportPost = (reportData,postId) => API.post(`/post/reportpost/${postId}`,reportData)



// request by admin

export const getReportedPosts = () => API.post(`/post/getreportedposts`)

export const reportedPostRemove =(postId) => API.post(`/post/reportedpostremove/${postId}`)