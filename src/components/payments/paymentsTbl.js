import PaymentsContent from './paymentsContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';

const PaymentsTable = () => {    

    const {data, loading} = useFetch('/payments')
      
      if(loading)return <h1>Loading...</h1>
        return (
            <>
                <h2 className='w-auto mx-5'>Payments</h2>
                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mx-5">            
                <table className="table table-striped table-hover table-bordered text-nowrap" >
                    <thead className="table-group-divider">
                        <tr>
                            <th  scope="col">ID</th>
                            <th  scope="col">Date</th>                            
                            <th  scope="col">Amount</th>
                            <th  scope="col">Interest Paid</th>
                            <th  scope="col">Principal Paid</th>
                            <th  scope="col">Fees Paid</th>
                            <th  scope="col">Borrower Name</th>
                            <th  scope="col">Loan ID</th>
                            <th  scope="col">Payment Channel</th>
                            <th  scope="col">Status</th>
                        </tr> 
                    </thead>
                    <tbody className="table-group-divider">
                    {data.map(payment => {
                        return <PaymentsContent key={payment._id} payment={payment} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
   
}
 
export default PaymentsTable;