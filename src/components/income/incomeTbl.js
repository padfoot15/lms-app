import IncomeContent from './incomeContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';
import { useState } from 'react';

const IncomeTable = () => {    

    const {data, loading} = useFetch('/income')
    const [filter, setFilter] = useState('date')
    const [search, setSearch] = useState('')
    if(loading)return <h1>Loading...</h1>

    function filterTbl(income){
        if (filter === 'date'){
            return (income.date).toLowerCase().includes(search)
        }else if (filter === 'account'){
            return (income.account).toLowerCase().includes(search)
        }
        return data
    }

        return (
            <>
                <div className="d-flex align-items-center mt-5 justify-content-center">
                    <h2 className='w-auto mx-5'>Income</h2>
                </div>
                <div className="mb-2">
                    <div className='ms-5'>
                        <label className='me-1' >Search by</label>
                        <select className='me-1'value={filter} onChange={(e)=>setFilter(e.target.value)} >
                            <option value='date'>Date</option>
                            <option value='account'>Account</option>
                            <option value='type'>Type</option>
                            <option value='note'>Note</option>
                        </select>
                        <input type='text' value={search.toLowerCase()} onChange={(e)=>setSearch(e.target.value)}/>                 
                    </div>                                                 
                </div> 
                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar mx-5">            
                <table className="table table-striped table-hover table-bordered text-nowrap" >
                    <thead className="table-group-divider">
                        <tr>
                            <th  scope="col">No.</th>
                            <th  scope="col">Date</th>                            
                            <th  scope="col">Amount</th>
                            <th  scope="col">Description</th>
                            <th  scope="col">Account</th>
                            <th  scope="col">Type</th>
                        </tr> 
                    </thead>
                    <tbody className="table-group-divider">
                    {data.filter(income => filterTbl(income) ).map((income,index) => {
                        return <IncomeContent key={income._id} index={index+1} income={income} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
   
}
 
export default IncomeTable;