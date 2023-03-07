import ServicesContent from './servicesContent';
import '../tables.css';
import { useEffect, useState } from 'react';
import axios from 'axios'

const ServicesTable = () => {    
  const [borrowers, setBorrowers] = useState(null)  
  const [state, setState] = useState({loading:true})

    useEffect( ()=>{
        async function getBorrowers(){
          const data = await axios.get(`${process.env.API_URL}/borrowers`)
          setBorrowers(data.data.borrowers)
          setState({loading:false})
        }
        getBorrowers();
      },[])
      
      if(state.loading){
        return <h1>Loading...</h1>
      }else{
        return (
            <>
                <h2 className='mx-5'>Borrowers</h2>
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
                    {Object.entries(borrowers).map(b => {
                        return <BorrowersContent key={b[1].id} borrower={b[1]} />
                    })}
                    </tbody>
                </table>
                </div>
            </>
            
         );
      }
   
}
 
export default ServicesTable;