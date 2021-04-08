export const transactionReducer = (state, action) => {
    
    switch(action.type){
        case 'CREATE':
            return state = [...state, action.transaction]
        case 'DELETE':
            return state = state.filter(transaction => transaction.id !== action.id)
        default:
            return state
    }
}


