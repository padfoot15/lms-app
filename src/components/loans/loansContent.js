
const LoansContent = ({loan}) => {
    return(
        <tr>
                <td>{loan._id}</td>
                <td>{loan.borrowerId}</td>
                <td>{loan.borrowerName}</td>
                <td>{loan.date}</td>
                <td>{loan.amount}</td>
        </tr>
    )
}

export default LoansContent;