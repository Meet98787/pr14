const initial ={
    users:"",
    pc:"",
    assign:""
}
const Reducers = (state=initial,action) =>{
    if(action.type === "fetch"){
        return {
            ...state,
            users: action.data
        };
    }
    if(action.type === "pcfatch"){
        return {
            ...state,
            pc: action.data
            
        };
    }
    if(action.type === "assignfatch"){
        return {
            ...state,
            assign: action.data
            
        };
    }
    return state
}
export default Reducers;