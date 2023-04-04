
import { formatter } from '../../util/util';
const IncomeContent = ({income, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{(new Date(income.date)).toLocaleDateString('fr-CA')}</td>                
                <td>{formatter.format(income.amount)}</td>
                <td>{income.description}</td>
                <td>{income.account}</td>
                <td>{income.type}</td>
        </tr>
    )
}

export default IncomeContent;