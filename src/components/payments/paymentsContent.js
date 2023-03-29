
import { formatter } from '../../util/util';
const PaymentsContent = ({payment, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{payment._id}</td>
                <td>{(new Date(payment.date)).toLocaleDateString('fr-CA')}</td>                
                <td>{formatter.format(payment.amount)}</td>
                <td>{formatter.format(payment.interestPaid)}</td>
                <td>{formatter.format(payment.principalPaid)}</td>
                <td>{formatter.format(payment.feesPaid)}</td>
                <td>{payment.borrowerId.name.firstName + " " + payment.borrowerId.name.lastName}</td>
                <td>{payment.loanId}</td>
                <td>{payment.paymentChannel}</td>
                <td>{payment.status}</td>
        </tr>
    )
}

export default PaymentsContent;