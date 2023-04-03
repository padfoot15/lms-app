
import { formatter } from '../../util/util';
const ExpensesContent = ({expense, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{(new Date(expense.date)).toLocaleDateString('fr-CA')}</td>                
                <td>{formatter.format(expense.amount)}</td>
                <td>{expense.account}</td>
                <td>{expense.type}</td>
                <td>{expense.note}</td>
        </tr>
    )
}

export default ExpensesContent;