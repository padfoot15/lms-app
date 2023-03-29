
import { formatter } from '../../util/util';
const LoansContent = ({loan, index}) => {    
      
    return(
        <tr>    
                <td>{index}</td>
                <td>{loan.loanId}</td>
                <td>{loan.borrowerId.name.firstName + " " + loan.borrowerId.name.lastName}</td>
                <td>{formatter.format(loan.amount)}</td>
                <td>{loan.interestRate}%</td>
                <td>{formatter.format(loan.interestAmount)}</td>
                <td>{loan.term}</td>
                <td>{formatter.format(loan.monthlyDue)}</td>
                <td>{(new Date(loan.startDate)).toLocaleDateString('fr-CA')}</td>
                <td>{(new Date(loan.dueDate)).toLocaleDateString('fr-CA')}</td>
                <td>{formatter.format(loan.balance)}</td>
                <td>{loan.status}</td>
        </tr>
    )
}

export default LoansContent;