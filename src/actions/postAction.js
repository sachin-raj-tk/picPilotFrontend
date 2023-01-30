import * as PostApi from '../api/PostRequest'

export const getTimelinePosts = (id) => async(dispatch)=>{
    
    dispatch({type: "RETREIVING_START"})
    try {
        const {data} = await PostApi.getTimelinePosts(id);
        dispatch({type: "RETREIVING_SUCCESS", data: data})
        
    } catch (error) {
        dispatch({type: "RETREIVING_FAIL"})
        console.log(error);
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}


export const addComment=(id,comment) => async(dispatch)=>{
    dispatch({type:"COMMENT_START"})
    console.log(id,comment,'addcomment postaction');
    try {
        console.log('ethiyo');
        dispatch({type:"COMMENT_SUCCESS", data:comment,id:id})
        await PostApi.addComment(id,comment);
        //console.log(data,'posta action ane');
    } catch (error) {
        dispatch({type:"COMMENT_FAIL"})
        console.log(error)
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }        
    }
}

export const deleteComment=(postId,commentId)=>async(dispatch)=>{
    dispatch({type:"COMMENT_DEL_START"})
    try {
        dispatch({type:"COMMENT_DEL_SUCCESS",data:commentId,id:postId})
        await PostApi.deleteComment(postId,commentId)
    } catch (error) {
        dispatch({type:"COMMENT_DEL_ERROR"})
        console.log(error)
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}

export const deletePost=(id,currentUser)=> async(dispatch)=>{
    dispatch({type:"DELETE_STARTED"})
    try {
        console.log(currentUser,'postaction deltepost');
        await PostApi.deletePost(id,currentUser);
        dispatch({type:"DELETE_SUCCESS", id:id})
    } catch (error) {
        dispatch({type:"DELETE_FAIL"})
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}


export const likePost = (id,userId) => async(dispatch) =>{
    try {
        await PostApi.likePost(id,userId)
    } catch (error) {
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}


export const ReportPost =(reportData,postId) => async (dispatch) => {
    try {
       return await PostApi.ReportPost(reportData,postId)
    } catch (error) {
        if(error.response.data === "token expired"){
            
            dispatch({type:"LOG_OUT"})
           }
    }
}