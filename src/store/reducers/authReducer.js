const initState={
   authError:null
}

const authReducer=(state=initState,action)=>{
    switch(action.type){
        case 'LOGIN_FAILED':
            console.log('Login Failed',action.payload);
            return{
                ...state,
                authError:'Login Failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('Login Success');
            return{
                ...state,
                authError:null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('SIGNOUT_SUCCESS');
            return state;

        case 'SIGNOUT_ERROR':
            console.log('SIGNOUT_ERROR');
            return state;

        case 'SIGNUP_SUCCESS':
            console.log('SIGNUP_SUCCESS');
            return {
                ...state,
                authError:null
            }

        case 'SIGNUP_ERROR':
            console.log('SIGNUP_ERROR');
            return{
                ...state,
                authError:action.payload.message
            }
            
        default:
            return state;
    }
}

export default authReducer;