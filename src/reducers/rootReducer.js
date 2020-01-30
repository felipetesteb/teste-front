const initState ={
    produtores : []
}

const rootReducer = (state = initState,action)=>{
    if(action.type == "FETCH_PRODUTORES"){
        return{
            produtores : action.data.result
        }}
    return state;
}

export default rootReducer