import * as UploadApi from '../api/UploadRequest'


export const uploadImage = (data) => async(dispatch) =>{
    try {
        await UploadApi.uploadImage(data)
        
    } catch (error) {
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}

export const uploadPost = (data) => async(dispatch)=>{
    dispatch({type: "UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type: "UPLOAD_SUCCESS",data: newPost.data})
    } catch (error) {
        console.log(error);
        dispatch({type: "UPLOAD_FAIL"})
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}