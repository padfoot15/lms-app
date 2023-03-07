import LoansContent from './loansContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';


const LoansTable = () => {
    
    const {data, loading} = useFetch('/loans')

    if(loading) return <h1>Loading...</h1>
    
        return (
            <>
                <h2 className='mx-5'>Loans</h2>
                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mx-5">            
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-group-divider">
                        <tr>
                            <th  scope="col">ID</th>
                            <th  scope="col">Borrower ID</th>
                            <th  scope="col">Borrower Name</th>
                            <th  scope="col">Date</th>
                            <th  scope="col">Amount</th>
                        </tr> 
                    </thead>
                    <tbody className="table-group-divider">
                    {data.map(loan => {
                        return <LoansContent key={loan._id} loan={loan} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
    
    
}
 
export default LoansTable;