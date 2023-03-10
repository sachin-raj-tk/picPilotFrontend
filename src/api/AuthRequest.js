import axios from 'axios'

const phase = process.env.REACT_APP_PHASE
const URL = phase === "testing"? process.env.REACT_APP_DOMAIN_URL_TESTING : process.env.REACT_APP_DOMAIN_URL;
const API = axios.create({baseURL: URL})

export const logIn = (formData) => API.post('/auth/login',formData)
export const signUp = (formData) => API.post('/auth/register',formData)
export const verifyotp = (userId,otp) => API.post('/auth/verifyotp',{userId:userId,otp:otp})