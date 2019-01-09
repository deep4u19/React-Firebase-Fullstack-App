export const signIn=(credentials)=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then(()=>{
            dispatch({
                type:'LOGIN_SUCCESS'
            })
        })
        .catch((err)=>{
            dispatch({
                type:'LOGIN_FAILED',
                payload:err
            })
        })
    }
}


export const signOut=()=>{
    return (dispatch,getState,{getFirebase})=>{
        const firebase=getFirebase();
        firebase.auth().signOut()
            .then(()=>{
                dispatch({
                    type:'SIGNOUT_SUCCESS'
                })
            })
            .catch((err)=>{
                dispatch({
                    type:'SIGNOUT_ERROR',
                    payload:err
                })
            })
    }
}

export const signUp=(newUsr)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase= getFirebase();
        const firestore=getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUsr.email,
            newUsr.password
        ).then((resp)=>{
            return firestore.collection('users').doc(resp.user.uid).set({
                email:newUsr.email,
                password:newUsr.password,
                firstName:newUsr.firstName,
                lastName:newUsr.lastName,
                initials:newUsr.firstName[0]+newUsr.lastName[0]
            })
        }).then(()=>{
            dispatch({
                type:'SIGNUP_SUCCESS'
            })
        }).catch(err=>{
            dispatch({
                type:'SIGNUP_ERROR',
                payload:err
            })
        })
    }
}