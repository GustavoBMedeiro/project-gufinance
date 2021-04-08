import { useContext, useState } from 'react'
import {transactionContext} from '../../contexts/TransactionContext'
import {v4} from 'uuid'

const Modal = ({ isOpen, close }) => {

    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('entrada')

    const {dispatch} = useContext(transactionContext)

    const submitHandler = (event) => {
        event.preventDefault();
        const transaction = {
            id: v4(),
            description,
            amount: formatAmount(amount),
            date,
            type
        }
        dispatch({type:'CREATE', transaction})
        cleanFields()
        close()
    }

    const cleanFields = () => {
        setDescription('')
        setAmount('')
        setDate('')
        setType('entrada')
    }

    const formatAmount = (amount) => {
        const value = String(amount).replace(/\D+/g, "")
        return value
    }

    const handlerCancel = (event) => {
        event.preventDefault()
        close()
    }

    return isOpen ? (
        <div className="modal-overlay active">
            <div className="modal">
                <h2>Transação</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="txt_description">Descrição</label>
                    <input
                        id="txt_description" 
                        type="text" 
                        placeholder="Descrição"
                        min="3"
                        required
                        value={description} 
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    <label htmlFor="txt_amount">Valor</label>
                    <input 
                        id="txt_amount" 
                        type="decimal" 
                        placeholder="Ex: 1.000,00"
                        min="3"
                        max="6"
                        required
                        value={amount}
                        onChange={(event) => setAmount(event.target.value) } 
                    />


                    <label htmlFor="txt_date">Data</label>
                    <input
                        id="txt_date"
                        type="date"
                        placeholder="Data"
                        required
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                    />
                    
                    <label htmlFor="txt_type">Tipo</label>
                    <select id="txt_type" value={type} onChange={(event) => setType(event.target.value)} required>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>

                    <div>
                        <button type="submit">Salvar</button>
                        <button onClick={handlerCancel}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    ) :
    (
        <div></div>
    )
}

export default Modal