
const InvestmentsContent = ({investment, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{investment.investor.name.firstName + " " + investment.investor.name.lastName}</td>
                <td>{investment.amount}</td>                
                <td>{investment.type}</td>
                <td>{investment.term}</td>
                <td>{investment.ratePerYr}</td>
                <td>{investment.ratePerMo}</td>
                <td>{investment.intAmtPerYr}</td>
                <td>{investment.intAmtPerMo}</td>
                <td>{investment.mthlyPayout}</td>
                <td>{investment.investedDate}</td>
                <td>{investment.payoutDates}</td>
                <td>{investment.balance}</td>
                <td>{investment.endDate}</td>
                <td>{investment.status}</td>
        </tr>
    )
}

export default InvestmentsContent;