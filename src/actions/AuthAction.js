import { toast } from 'react-hot-toast'
import * as AuthApi from '../api/AuthRequest.js'

export const logIn = (formData) => async(dispatch) => {
    dispatch({type:"AUTH_START"})
    try {
        const {data} = await AuthApi.logIn(formData)
        dispatch({type:"AUTH_SUCCESS", data: data})
        toast.success("Login Success")
        console.log(data,'authaction loggin')
    } catch (error) {
        console.log(error);
        dispatch({type:"AUTH_FAIL"})
        toast.error(error.response.data)
    }
}


export const verifyotp = (userId,otp) => async(dispatch) => {
    console.log(otp,'ith authaction verify otp ane');
    dispatch({type:"AUTH_START"})
    try {
        const {data} = await AuthApi.verifyotp(userId,otp)
        console.log(data,'auth data ethiyo authacion signupil')
        dispatch({type:"AUTH_SUCCESS", data: data})
        
    } catch (error) {
        console.log(error);
        dispatch({type:"AUTH_FAIL"})
    }
}

export const logOut = () =>async(dispatch) => {
    dispatch({type:"LOG_OUT"})
}