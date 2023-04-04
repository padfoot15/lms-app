import { useState } from 'react';
import axios from 'axios';

const AddIncome = () => {
    const incomeData = {        
        date : "",
        amount : "",
        description: "",
        account : "",
        type : ""
                 
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [income , setIncome] = useState(incomeData)                                   
    
    async function handleSubmit(e){
        e.preventDefault();
        if(parseInt(income.amount) <= 0 || isNaN(parseInt(income.amount)) ){            
            setErrorMsg("***Amount should be more than 0")        
        }else if(income.date === ''){
            setErrorMsg("***Date is required")        
        }else if(income.account === ''){
            setErrorMsg("***Account is required")        
        }else if(income.type === ''){
            setErrorMsg("***Type is required")        
        }else if(income.description === ''){
            setErrorMsg("***Description is required")        
        }else{
             //add income
             try {
                await axios.post(process.env.REACT_APP_API_URL + "/income",income)  
                
                //clear states
                setErrorMsg('');
                setIncome(incomeData)

             } catch (error) {
                console.log(error)
             }             
        }
        
    }

    function handleChange(e){      
        setIncome({...income,[e.target.id]:e.target.value})       
    }
    
    return ( 
        <>   
        <div className="d-flex align-items-center mb-2 justify-content-center">
            <h2>New Income</h2>                    
        </div>
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">                    
                    <div className='col-4'>
                        <h2>Income</h2>
                    </div>
                    <div className='col-1'></div>
                    <div className='col'>
                        <p style={{color:"red",fontStyle:"italic"}}>{errorMsg}</p>
                    </div>                    
                </div>
                <div className="row mb-3">
                    <div className='col-1'></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Date</label>
                            <input type='date' className='form-control' id="date" value={income.date} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="text" className='form-control' id='amount' value={income.amount} placeholder="0" onChange={handleChange} /> 
                        </div>
                    </div>    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Account</label>
                            <select className="form-select" id="account" value={income.account} onChange={handleChange}>
                                <option value="" hidden>Select account...</option>
                                <option value="BPI">BPI</option>
                                <option value="GCASH">GCASH</option>
                                <option value="CHECKING">Checking</option>
                                <option value="CASH">Cash</option>
                            </select>
                        </div>
                    </div>            
                </div>
                
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Type</label>
                            <select className="form-select" id="type" value={income.type} onChange={handleChange}>
                                <option value="" hidden>Select type...</option>
                                <option value="gsave">GSAVE</option>
                                <option value="other">Other</option>
                            </select>
                        </div>                        
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Description</label>
                            <input type="textarea" className='form-control' id='description' value={income.description} onChange={handleChange}/> 
                        </div>
                    </div>                                           
                </div>                
                <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                </div>                
            </form>            
        </div>         
        </>
     );
}
 
export default AddIncome;