import { toast } from 'react-hot-toast'
import * as AuthApi from '../api/AuthRequest.js'

export const logIn = (formData) => async(dispatch) => {
    dispatch({type:"AUTH_START"})
    try {
        const {data} = await AuthApi.logIn(formData)
        dispatch({type:"AUTH_SUCCESS", data: data})
        toast.success("Login Success")
        
    } catch (error) {
        
        dispatch({type:"AUTH_FAIL"})
        toast.error(error.response.data)
    }
}


export const verifyotp = (userId,otp) => async(dispatch) => {
    
    dispatch({type:"AUTH_START"})
    try {
        const {data} = await AuthApi.verifyotp(userId,otp)
        
        dispatch({type:"AUTH_SUCCESS", data: data})
        
    } catch (error) {
        
        dispatch({type:"AUTH_FAIL"})
    }
}

export const logOut = () =>async(dispatch) => {
    dispatch({type:"LOG_OUT"})
}