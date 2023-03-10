const authReducer = (
    state = { authData: null, loading: false, error: false}, action
) => {

    switch(action.type)
    {
        case "AUTH_START":
            return {...state, loading: true, error:false}
        case "AUTH_SUCCESS":
            localStorage.setItem("profile",JSON.stringify({...action?.data}))
            return {...state, authData:action.data,loading:false, error:false}
        case "AUTH_FAIL":
            return {...state, loading:false, error:true}

        


        case "UPDATING_START":
            return {...state,  updateLoading:true, error: false}
        case "UPDATING_SUCCESS":
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData:action.data, updateLoading:false, error: false}
        case "UPDATING_FAIL":
            return {...state, updateLoading: false, error:true}


        case "FOLLOW_USER":
            return {...state, authData: {...state.authData, user:{...state.authData.user, following:[...state.authData.user.following,action.data]}}}
        case "UNFOLLOW_USER":
            return {...state, authData: {...state.authData, user:{...state.authData.user, following:[...state.authData.user.following.filter((personId)=>personId!==action.data)]}}}
        
        case "SAVE_POST":
            return{...state,loading:true,error:false};
        case "SAVE_POST_SUCCESS":
            return{...state,authData:{...state.authData,user:{...state.authData.user,savedposts:state.authData.user.savedposts.includes(action.data)?[...state.authData.user.savedposts.filter((eachpostId)=>eachpostId !== action.data)]:[...state.authData.user.savedposts,action.data]}},loading:false,error:false};
        case  "SAVE_POST_FAILED":
            return{...state,loading:false,error:true};
        case "SEND_ISFAMOUS_REQUEST":
            return{...state,authData:{...state.authData,user:{...state.authData.user,isFamous:"pending"}}};
        case "LOG_OUT":
            localStorage.clear();
            return {...state,authData: null,loading:false,error:false}
        default: 
            return state 
    }
};


export default authReducer