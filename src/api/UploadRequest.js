import axios from 'axios'

// const API = axios.create({baseURL: "http://localhost:5000"})


const phase = process.env.REACT_APP_PHASE
const URL = phase === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL;
const API = axios.create({baseURL: URL})



export const uploadImage = (data) => API.post('/upload/',data)


export const uploadPost = (data) => API.post('/post',data)