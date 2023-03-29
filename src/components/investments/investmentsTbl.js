import InvestmentsContent from './investmentsContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';
import { useState } from 'react';

const InvestmentsTable = () => {    

    const {data, loading} = useFetch('/investments')
    const [filter, setFilter] = useState('investorName')
    const [search, setSearch] = useState('')
    if(loading)return <h1>Loading...</h1>

    function filterTbl(investment){
        if (filter === 'investorName'){
            return (investment.investor.name.firstName + " " + investment.investor.name.lastName).toLowerCase().includes(search)                   
        }
        return data
    }

        return (
            <>
                <div className="d-flex align-items-center mt-5 justify-content-center">
                    <h2 className='w-auto mx-5'>Investments</h2>
                </div>
                <div className="mb-2">
                    <div className='ms-5'>
                        <label className='me-1' >Search by</label>
                        <select className='me-1'value={filter} onChange={(e)=>setFilter(e.target.value)} >                        
                            <option value='investorName'>Investor Name</option>
                        </select>
                        <input type='text' value={search.toLowerCase()} onChange={(e)=>setSearch(e.target.value)}/>                 
                    </div>                                                 
                </div> 
                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mx-5">            
                <table className="table table-striped table-hover table-bordered text-nowrap" >
                    <thead className="table-group-divider">
                        <tr>
                            <th  scope="col">No.</th>
                            <th  scope="col">Investor Name</th>
                            <th  scope="col">Amount</th>                            
                            <th  scope="col">Type</th>
                            <th  scope="col">Term (Years)</th>
                            <th  scope="col">Yearly Rate</th>
                            <th  scope="col">Monthly Rate</th>
                            <th  scope="col">Yearly Interest Amount</th>
                            <th  scope="col">Monthly Interest Amount</th>
                            <th  scope="col">Monthly Payout</th>
                            <th  scope="col">Invested Date</th>
                            <th  scope="col">Balance</th>
                            <th  scope="col">Start Date</th>
                            <th  scope="col">End Date</th>
                            <th  scope="col">Status</th>
                        </tr> 
                    </thead>
                    <tbody className="table-group-divider">
                    {data.filter(investments => filterTbl(investments) ).map((investment,index) => {
                        return <InvestmentsContent key={investment._id} index={index+1} investment={investment} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
   
}
 
export default InvestmentsTable;