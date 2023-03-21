import LoansContent from './loansContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';
import {  useState } from 'react';


const LoansTable = () => {  
    const {data, loading} = useFetch('/loans')    
    const [filter, setFilter] = useState('in-progress')

    if(loading) return <h1>Loading...</h1>

    
        return (
            <>                
                <div className="d-flex align-items-center mt-5 justify-content-center">
                    <h2>Loans</h2>                    
                </div>                    
                <div className="mb-2">
                    <div className='ms-5'>
                        <label className='me-1'>Status</label>
                        <select onChange={(e) => setFilter(e.target.value) } value={filter}>
                            <option value="all">All</option>
                            <option value="Complete">Complete</option>
                            <option value="in-progress">In-Progress</option>
                        </select>                  
                    </div>                                                 
                </div>
                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mx-5">            
                <table className="table table-striped table-hover table-bordered text-nowrap">
                    <thead className="table-group-divider">
                        <tr>
                            <th  scope="col">No.</th>
                            <th  scope="col">ID</th>
                            <th  scope="col">Borrower Name</th>
                            <th  scope="col">Loan Amount</th>
                            <th  scope="col">Monthly Interest Rate</th>
                            <th  scope="col">Monthly Interest Amount</th>
                            <th  scope="col">Term</th>
                            <th  scope="col">Monthly Due</th>
                            <th  scope="col">Start Date</th>
                            <th  scope="col">Due Date</th>
                            <th  scope="col">Balance</th>
                            <th  scope="col">Status</th>
                        </tr> 
                    </thead>
                    <tbody className="table-group-divider">
                    {data.filter(loans => {
                        if(filter === 'all') return data                       
                        return loans.status === filter
                    }).map((loan,index) => {
                        return <LoansContent key={loan._id} index={index+1} loan={loan} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
    
    
}
 
export default LoansTable;