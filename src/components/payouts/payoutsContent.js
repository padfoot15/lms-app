
import { formatter } from '../../util/util';

const PayoutsContent= ({payout, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{(new Date(payout.date)).toLocaleDateString('fr-CA')}</td>                
                <td>{formatter.format(payout.amount)}</td>                
                <td>{payout.investmentId}</td>
                <td>{payout.account}</td>
        </tr>
    )
}

export default PayoutsContent ;