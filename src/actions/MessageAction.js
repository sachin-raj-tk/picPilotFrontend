import * as MessageApi from '../api/MessageRequest'

export const getMessages=(chatId) => async(dispatch) =>{
    try {
        return await MessageApi.getMessages(chatId)
    } catch (error) {
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}


// export const addMessage = (message) => async(dispatch) =>{
//     try {
//         return await MessageApi.addMessage(message)
//     } catch (error) {
//         if(error.response.data === "token expired"){
            
//             dispatch({type:"LOG_OUT"})
//            }
//     }
// }