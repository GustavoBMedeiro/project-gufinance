import React from 'react'
import { transactionContext } from '../contexts/TransactionContext'

import Header from './layouts/Header'
import MainPanel from './layouts/MainPanel'

const Home = () => {
    return(
        <transactionContext.Consumer>
            {(transContext) => {
                return(
                    <div>
                        <Header></Header>
                        <MainPanel></MainPanel>
                    </div>
                )
            }}
        </transactionContext.Consumer>
    )  
}

export default Home