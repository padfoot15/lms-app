import { useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
    const expenseData = {        
        date : "",
        amount : "",
        account : "",
        type : "",
        note: ""         
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [expense , setExpense] = useState(expenseData)                                   
    
    async function handleSubmit(e){
        e.preventDefault();
        if(parseInt(expense.amount) <= 0 || isNaN(parseInt(expense.amount)) ){            
            setErrorMsg("***Amount should be more than 0")        
        }else if(expense.date === ''){
            setErrorMsg("***Date is required")        
        }else if(expense.account === ''){
            setErrorMsg("***Account is required")        
        }else if(expense.type === ''){
            setErrorMsg("***Type is required")        
        }else if(expense.note === ''){
            setErrorMsg("***Note is required")        
        }else{
             //add expense
             try {
                await axios.post(process.env.REACT_APP_API_URL + "/expenses",expense)  
                
                //clear states
                setErrorMsg('');
                setExpense(expenseData)

             } catch (error) {
                console.log(error)
             }             
        }
        
    }

    function handleChange(e){      
        setExpense({...expense,[e.target.id]:e.target.value})       
    }
    
    return ( 
        <>   
        <div className="d-flex align-items-center mb-2 justify-content-center">
            <h2>New Expense</h2>                    
        </div>
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">                    
                    <div className='col-4'>
                        <h2>Expense</h2>
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
                            <input type='date' className='form-control' id="date" value={expense.date} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="text" className='form-control' id='amount' value={expense.amount} placeholder="0" onChange={handleChange} /> 
                        </div>
                    </div>    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Account</label>
                            <select className="form-select" id="account" value={expense.account} onChange={handleChange}>
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
                            <select className="form-select" id="type" value={expense.type} onChange={handleChange}>
                                <option value="" hidden>Select type...</option>
                                <option value="LOAN">Loan</option>
                                <option value="PAYOUT">Payout</option>
                                <option value="OPS">Operation</option>
                            </select>
                        </div>                        
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Note</label>
                            <input type="textarea" className='form-control' id='note' value={expense.note} onChange={handleChange}/> 
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
 
export default AddExpense;