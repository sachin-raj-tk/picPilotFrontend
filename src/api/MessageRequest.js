import axios from 'axios'

// const API = axios.create({baseURL: "http://localhost:5000"})

const URL = process.env.DOMAIN_URL
const API = axios.create({baseURL: URL})

export const getMessages = (id) =>API.get(`/message/${id}`)

export const addMessage = (data) =>API.post('/message/',data)