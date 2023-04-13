import LoansContent from './loansContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';
import {  useState } from 'react';


const LoansTable = () => {  
    const {data, loading} = useFetch('/loans')    
    const [filter, setFilter] = useState('status')
    const [search, setSearch] = useState('in-progress')
    if(loading) return <h1>Loading...</h1>

    function filterTbl(records){
        if (filter === 'borrowerName'){
            return (records.borrowerId.name.firstName).toLowerCase().includes(search) ||
                   (records.borrowerId.name.lastName).toLowerCase().includes(search)
        }else if (filter === 'status'){
            return (records.status).toLowerCase().includes(search)
        }
        return data
    }
    
        return (
            <>                
                <div className="d-flex align-items-center mt-5 justify-content-center">
                    <h2>Loans</h2>                    
                </div>                    
                <div className="mb-2">
                    <div className='ms-5'>
                        <label className='me-1' >Search by</label>
                        <select className='me-1'value={filter} onChange={(e)=>setFilter(e.target.value)} >
                            <option value='status'>Status</option>
                            <option value='borrowerName'>Borrower Name</option>
                        </select>
                        <input type='text' value={search.toLowerCase()} onChange={(e)=>setSearch(e.target.value)}/>                 
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
                    {data.filter(records => filterTbl(records)).map((loan,index) => {
                        return <LoansContent key={loan._id} index={index+1} loan={loan} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
    
    
}
 
export default LoansTable;