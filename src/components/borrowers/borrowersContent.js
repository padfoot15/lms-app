
const BorrowersContent = ({borrower, index}) => {
    return(
        <tr>
                <td>{index}</td>
                <td>{borrower._id}</td>
                <td>{borrower.name.firstName}</td>
                <td>{borrower.name.middleName}</td>
                <td>{borrower.name.lastName}</td>
                <td>{borrower.address.street}</td>
                <td>{borrower.address.brgy}</td>
                <td>{borrower.address.city}</td>
                <td>{borrower.address.zip}</td>
                <td>{borrower.contact.number}</td>
                <td>{borrower.contact.email}</td>
        </tr>
    )
}

export default BorrowersContent;