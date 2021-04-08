import React, { useContext, useState} from 'react'
import { transactionContext } from '../../contexts/TransactionContext'
import CardBalance from './CardBalance'
import Modal from './Modal'

const MainPanel = () => {

    const {transaction, enterTotal, outTotal, total, dispatch} = useContext(transactionContext)
    const [isOpen, setIsOpen] = useState(false)
    const handlerDelete = (id) => {

        dispatch({type: 'DELETE', id: id})
    }

    const handlerModal = () => {
        setIsOpen(!isOpen)
    }

    const formatAmount = (value) => {
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style : "currency",
            currency: "BRL"
        })

        return value
    }

    const formatDate = (date) => {
        var splitDate = date.split("-")
        var reverseDate = splitDate.reverse()
        var joinDate = reverseDate.join("-")
        return joinDate
    }

    const listTransaction = transaction.length > 0 ? transaction.map(trans => (
        <tr key={trans.id} style={{color: '#505959'}}>
            <td >{trans.description}</td>
            <td className={trans.type}>{formatAmount(trans.amount)}</td>
            <td>{formatDate(trans.date)}</td>
            <td className={trans.type}>{trans.type.replace('i', 'í')}</td>
            <td><span className="material-icons" onClick={() => handlerDelete(trans.id)} style={{color: '#505959', cursor:'pointer'}}>delete_forever</span></td>
        </tr>
    )) : (
        <tr><td colSpan="5"><strong style={{color:'#505959'}}>A lista de transações está vazia. Adicione sua primeira transação clicando no botão acima.</strong></td></tr>
    )

    return (
        <main>
            <section id="balance-container">
                <div>
                    <CardBalance title="Entradas" amount={formatAmount(enterTotal)} styleClass="card card-white" icone="arrow_upward" />
                    <CardBalance title="Saídas" amount={formatAmount(outTotal)} styleClass=" card card-white" icone="arrow_downward" />
                    <CardBalance title="Total" amount={formatAmount(total)} styleClass="card card-green" icone="payment" />
                </div>
            </section>

            <Modal isOpen={isOpen} close={handlerModal} />
            <button onClick={handlerModal} className="btn-transaction">nova transação</button>

            <section id="transaction-container">

                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listTransaction}
                    </tbody>
                </table>
            </section>

        </main>
    )
}

export default MainPanel