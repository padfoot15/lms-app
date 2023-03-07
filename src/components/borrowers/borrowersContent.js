
const BorrowersContent = ({borrower}) => {
    return(
        <tr>
                <td>{borrower._id}</td>
                <td>{borrower.firstName}</td>
                <td>{borrower.lastName}</td>
                <td>{borrower.address}</td>
                <td>{borrower.contactNumber}</td>
        </tr>
    )
}

export default BorrowersContent;