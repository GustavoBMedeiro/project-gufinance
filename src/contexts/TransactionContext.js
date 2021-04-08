import {createContext, useReducer, useEffect, useState} from 'react'
import { transactionReducer } from '../reducers/transactionReducer'


export const transactionContext = createContext()

const TransactionProvider = (props) =>{

    const [transaction, dispatch] = useReducer(transactionReducer, [] , () => {
        const localTransaction = localStorage.getItem('transactions')

        return localTransaction ? JSON.parse(localTransaction) : []

    })

    const [enterTotal, setEnterTotal] = useState(0)
    const [outTotal, setOutTotal] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        
        localStorage.setItem('transactions', JSON.stringify(transaction))   
       
        var totalEnter = 0
        var totalOut = 0

        transaction.map(trans => {
            if(trans.type === 'entrada'){
                totalEnter += Number(trans.amount)
            }else{
                totalOut += Number(trans.amount)
            }
            return null
        })

        setEnterTotal(totalEnter)
        setOutTotal(totalOut)
        setTotal(totalEnter - totalOut)
    }, [transaction])

    return(
        <transactionContext.Provider value={{transaction, enterTotal, outTotal,total, dispatch}}>
            {props.children}
        </transactionContext.Provider>
    )

}

export default TransactionProvider