const CardBalance = ({title, amount, styleClass, icone}) => {
    var color = ''
    switch(title){
        case 'Entradas':
            color = '#1F5C46'
            break
        case 'Saídas':
            color = '#D9644A'
            break
        case 'Total':
            color = '#1F5C46'
            break
        default:
            color = 'white';
            break
    }

    if(String(amount).includes("-")){
        color = '#D9644A'
    }
    return(
        <div className={styleClass}>
            <h4>{title} <span className="material-icons" style={{color:color}}>{icone}</span></h4>
            <p style={{color:color}}>{amount}</p>
        </div>
    )
}

export default CardBalance