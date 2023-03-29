import { formatter } from '../../util/util';

const InvestmentsContent = ({investment, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{investment.investor.name.firstName + " " + investment.investor.name.lastName}</td>
                <td>{formatter.format(investment.amount)}</td>                
                <td>{investment.type}</td>
                <td>{investment.term}</td>
                <td>{investment.ratePerYr + "%"}</td>
                <td>{investment.ratePerMo + "%"}</td>
                <td>{formatter.format(investment.intAmtPerYr)}</td>
                <td>{formatter.format(investment.intAmtPerMo)}</td>
                <td>{isNaN(investment.mthlyPayout) ? formatter.format(0) : formatter.format(investment.mthlyPayout)}</td>
                <td>{(new Date(investment.investedDate)).toLocaleDateString('fr-CA')}</td>
                <td>{formatter.format(investment.balance)}</td>
                <td>{(new Date(investment.startDate)).toLocaleDateString('fr-CA')}</td>
                <td>{(new Date(investment.endDate)).toLocaleDateString('fr-CA')}</td>
                <td>{investment.status}</td>
        </tr>
    )
}

export default InvestmentsContent;