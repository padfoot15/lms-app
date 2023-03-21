import BorrowersContent from './borrowersContent';
import '../tables.css';
import useFetch from '../../customHooks/useFetch';

const BorrowersTable = () => {    

    const {data, loading} = useFetch('/borrowers')
      
      if(loading)return <h1>Loading...</h1>
        return (
            <>
                <h2 className='w-auto mx-5'>Borrowers</h2>
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
                    {data.map((b,index) => {
                        return <BorrowersContent key={b._id} index={index+1} borrower={b} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
   
}
 
export default BorrowersTable;