
const LoansContent = ({loan}) => {
    return(
        <tr>
                <td>{loan._id}</td>
                <td>{loan.borrowerId.name.firstName + " " + loan.borrowerId.name.lastName}</td>
                <td>{loan.amount}</td>
                <td>{loan.interestRate}</td>
                <td>{loan.interestAmount}</td>
                <td>{loan.term}</td>
                <td>{loan.monthlyDue}</td>
                <td>{loan.startDate}</td>
                <td>{loan.dueDate}</td>
                <td>{loan.balance}</td>
                <td>{loan.status}</td>
        </tr>
    )
}

export default LoansContent;