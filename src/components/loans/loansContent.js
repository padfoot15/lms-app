
const LoansContent = ({loan, index}) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });
    return(
        <tr>    
                <td>{index}</td>
                <td>{loan._id}</td>
                <td>{loan.borrowerId.name.firstName + " " + loan.borrowerId.name.lastName}</td>
                <td>{formatter.format(loan.amount)}</td>
                <td>{loan.interestRate}%</td>
                <td>{formatter.format(loan.interestAmount)}</td>
                <td>{loan.term}</td>
                <td>{formatter.format(loan.monthlyDue)}</td>
                <td>{loan.startDate}</td>
                <td>{loan.dueDate}</td>
                <td>{formatter.format(loan.balance)}</td>
                <td>{loan.status}</td>
        </tr>
    )
}

export default LoansContent;