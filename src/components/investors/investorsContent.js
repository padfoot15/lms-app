
const InvestorsContent = ({investor, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{investor.name.firstName}</td>
                <td>{investor.name.middleName}</td>
                <td>{investor.name.lastName}</td>
                <td>{investor.address.street}</td>
                <td>{investor.address.brgy}</td>
                <td>{investor.address.city}</td>
                <td>{investor.address.zip}</td>
                <td>{investor.contact.number}</td>
                <td>{investor.contact.email}</td>
        </tr>
    )
}

export default InvestorsContent;