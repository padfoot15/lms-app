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
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-group-divider">
                        <tr>
                            <th  scope="col">ID</th>
                            <th  scope="col">First Name</th>
                            <th  scope="col">Last Name</th>
                            <th  scope="col">Address</th>
                            <th  scope="col">Contact Number</th>
                        </tr> 
                    </thead>
                    <tbody className="table-group-divider">
                    {Object.entries(data).map(b => {
                        return <BorrowersContent key={b[1]._id} borrower={b[1]} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
   
}
 
export default BorrowersTable;