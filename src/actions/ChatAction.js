import * as ChatApi from '../api/ChatRequest.js'

export const userChats = (id) => async(dispatch) =>{
    try {
        return await ChatApi.userChats(id)
    } catch (error) {
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}


export const createChats = (userId,followingId) =>async(dispatch) =>{
    try {
        await ChatApi.createChats(userId,followingId)
    } catch (error) {
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}


// export const getThisChat = (newUserfromProfileMessageButton,currentUserId) => async(dispatch) =>{
//     try {
//         return await ChatApi.getThisChat(newUserfromProfileMessageButton,currentUserId)
//     } catch (error) {
//         if(error.response.data === "token expired"){
            
//             dispatch({type:"LOG_OUT"})
//            }
//     }
// }