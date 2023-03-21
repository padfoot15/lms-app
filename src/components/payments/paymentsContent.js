
const PaymentsContent = ({payment, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{payment._id}</td>
                <td>{payment.date}</td>                
                <td>{payment.amount}</td>
                <td>{payment.interestPaid}</td>
                <td>{payment.principalPaid}</td>
                <td>{payment.feesPaid}</td>
                <td>{payment.borrowerId.name.firstName + " " + payment.borrowerId.name.lastName}</td>
                <td>{payment.loanId}</td>
                <td>{payment.paymentChannel}</td>
                <td>{payment.status}</td>
        </tr>
    )
}

export default PaymentsContent;