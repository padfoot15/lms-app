import PaymentsContent from './paymentsContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';
import { useState } from 'react';

const PaymentsTable = () => {    

    const {data, loading} = useFetch('/payments')
    const [filter, setFilter] = useState('borrowerName')
    const [search, setSearch] = useState('')
    if(loading)return <h1>Loading...</h1>

    function filterTbl(payments){
        if (filter === 'borrowerName'){
            return (payments.borrowerId.name.firstName).toLowerCase().includes(search) ||
                   (payments.borrowerId.name.lastName).toLowerCase().includes(search)
        }else if (filter === 'loanId'){
            return (payments.loanId).toLowerCase().includes(search)
        }
        return data
    }

        return (
            <>
                <div className="d-flex align-items-center mt-5 justify-content-center">
                    <h2 className='w-auto mx-5'>Payments</h2>
                </div>
                <div className="mb-2">
                    <div className='ms-5'>
                        <label className='me-1' >Search by</label>
                        <select className='me-1'value={filter} onChange={(e)=>setFilter(e.target.value)} >
                            <option value='loanId'>Loan ID</option>
                            <option value='borrowerName'>Borrower Name</option>
                        </select>
                        <input type='text' value={search.toLowerCase()} onChange={(e)=>setSearch(e.target.value)}/>                 
                    </div>                                                 
                </div> 
                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mx-5">            
                <table className="table table-striped table-hover table-bordered text-nowrap" >
                    <thead className="table-group-divider">
                        <tr>
                            <th  scope="col">No.</th>
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
                    {data.filter(payments => filterTbl(payments) ).map((payment,index) => {
                        return <PaymentsContent key={payment._id} index={index+1} payment={payment} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
   
}
 
export default PaymentsTable;