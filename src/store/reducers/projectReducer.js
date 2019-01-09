const initState={
    projects:[
        {id:'1',title:'post 1',content:'Content 1'},
        {id:'2',title:'post 2',content:'Content 2'},
        {id:'3',title:'post 3',content:'Content 3'}
    ]
}
const projectReducer=(state=initState,action)=>{
    switch(action.type){
        case 'CREATE_PROJECT':
            console.log('SUCCESS',action.payload);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('ERROR',action.payload);
            return state;
        default:
            return state;
    }
 }
export default projectReducer;