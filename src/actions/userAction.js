import * as UserApi from '../api/UserRequest.js'


export const updateUser = (id, formData) => async(dispatch) => {
    dispatch({type : "UPDATING_START"})
    try {
        const {data} = await UserApi.updateUser(id, formData);
        dispatch({type: "UPDATING_SUCCESS", data : data})
    } catch (error) {
        dispatch({type: "UPDATING_FAIL"})
    }
}

export const followUser = (id,data) => async(dispatch)=>{
     UserApi.followUser(id,data)
     console.log(data,'useraction, followuser');
    dispatch({type: "FOLLOW_USER",data:id,currentUserId:data._id})
}

export const unFollowUser = (id,data) => async(dispatch)=>{
     UserApi.unFollowUser(id,data)
    dispatch({type: "UNFOLLOW_USER",data:id,currentUserId:data._id})
}

export const getUser = (id) => async(dispatch)=>{
    dispatch({type:"FETCH_USER_DETAILS"})
     
     try {
        const {data} = await UserApi.getUser(id)
        console.log(data,'useraction getuser')
        console.log(id,'useraction getuser1');   
        dispatch({type:"USER_DETAILS_FETCHED",data:data})
    } catch (error) {
         dispatch({type:"USER_DETAILS_FETCHING_FAIL"})
        
     }
}

export const savePostApi = (id,postId)=> async(dispatch)=>{
    dispatch({type:"SAVE_POST"})
    try {
        const response = await UserApi.savePostApi(id,postId)
        dispatch({type:"SAVE_POST_SUCCESS",data:postId})
    } catch (error) {
        dispatch({type:"SAVE_POST_FAILED"})
    }
}