
const LoansContent = ({loan}) => {
    return(
        <tr>
                <td>{loan._id}</td>
                <td>{loan.borrowerId._id}</td>
                <td>{loan.borrowerId.name.firstName + " " + loan.borrowerId.name.lastName}</td>
                <td>{loan.dueDate}</td>
                <td>{loan.amount}</td>
        </tr>
    )
}

export default LoansContent;