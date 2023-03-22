import BorrowersContent from './borrowersContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';
import { useState } from 'react';

const BorrowersTable = () => {    

    const {data, loading} = useFetch('/borrowers')
    const [filter, setFilter] = useState('firstName')
    const [search, setSearch] = useState('')
      if(loading)return <h1>Loading...</h1>

      function filterTbl(borrower){                                
            if (filter.includes('Name')) return (borrower['name'][filter]).toLowerCase().includes(search)
            return data        
      }
        return (
            <>
                <div className="d-flex align-items-center mt-5 justify-content-center">
                    <h2 className='w-auto mx-5'>Borrowers</h2>
                </div>      
                <div className="mb-2">
                    <div className='ms-5'>
                        <label className='me-1' >Search by</label>
                        <select className='me-1'value={filter} onChange={(e)=>setFilter(e.target.value)} >
                            <option value='firstName'>First Name</option>
                            <option value='middleName'>Middle Name</option>
                            <option value='lastName'>Last Name</option>
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
                            <th  scope="col">First Name</th>                            
                            <th  scope="col">Middle Name</th>
                            <th  scope="col">Last Name</th>
                            <th  scope="col">Street Address</th>
                            <th  scope="col">Brgy Address</th>
                            <th  scope="col">City Address</th>
                            <th  scope="col">Zip Address</th>
                            <th  scope="col">Contact Number</th>
                            <th  scope="col">Email Address</th>
                        </tr> 
                    </thead>
                    <tbody className="table-group-divider">
                    {data.filter(borrower => filterTbl(borrower)).map((b,index) => {
                        return <BorrowersContent key={b._id} index={index+1} borrower={b} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
   
}
 
export default BorrowersTable;