import { useState } from 'react';
import useFetch from '../../customHooks/useFetch';
import axios from 'axios';

const AddLoan = () => {
    const paymentData = {
        date : "",
        amount : "0",
        interestPaid : "0",
        principalPaid : "0",
        feesPaid : "0",
        borrowerId : "",
        loanId :  "",
        paymentChannel : "",
        status : ""
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [borrower, setBorrower] = useState('')
    const [payment , setPayment] = useState(paymentData)
    const {data, loading} = useFetch('/loans/active')                                     

    if(loading)return <h1>Loading...</h1> 
    
    async function handleSubmit(e){
        e.preventDefault();
        if(parseInt(payment.amount) <= 0 || isNaN(parseInt(payment.amount)) ){            
            setErrorMsg("***Amount should be more than 0")        
        }else if(payment.date === ''){
            setErrorMsg("***Date is required")        
        }else if(payment.loanId === ''){
            setErrorMsg("***Loan ID is required")        
        }else if(payment.paymentChannel === ''){
            setErrorMsg("***Payment channel is required")        
        }else if(payment.status === ''){
            setErrorMsg("***Status is required")        
        }else{
             //add payment
             await axios.post(process.env.REACT_APP_API_URL + "/payments",payment)
             //update balance        
             let balance = data.filter(loan => loan._id === payment.loanId)[0].balance
             balance = parseInt(balance) - payment.principalPaid - payment.interestPaid
             console.log("balance:",balance) 
             await axios.put(process.env.REACT_APP_API_URL + "/loans/update",null,
             {
                 params:{
                     balance,
                     id:payment.loanId
                 }
             })
             //clear state
             setPayment(paymentData)
        }
        
    }

    async function handleChange(e){       
        let principalPaid = payment.principalPaid
        let borrowerId = payment.borrowerId;    

        if(e.target.id === 'amount' || e.target.id === 'interestPaid' || e.target.id === 'feesPaid'){ 
            
            e.target.value = isNaN(e.target.value) ? 0 : e.target.value
            const amount = e.target.id==='amount' ? parseInt(e.target.value) : payment.amount
            const interestPaid = e.target.id==='interestPaid' ? parseInt( e.target.value) : payment.interestPaid
            const feesPaid = e.target.id==='feesPaid' ? parseInt( e.target.value ) : payment.feesPaid
            principalPaid = amount - interestPaid - feesPaid
            principalPaid = isNaN(principalPaid) ? payment.principalPaid : principalPaid
        }

        if(e.target.id==='loanId'){
            const borrower = data.filter(loan => loan._id === e.target.value)[0]
            borrowerId = borrower.borrowerId._id   
            const fullName = borrower.borrowerId.name.firstName + ' ' + borrower.borrowerId.name.lastName
            setBorrower(fullName)                           
        }

        setPayment({...payment,[e.target.id]:e.target.value,principalPaid,borrowerId})
       
    }
    
    return ( 
        <>   
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">                    
                    <div className='col-4'>
                        <h2>Payment</h2>
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
                            <input type="date" className='form-control' id='date' value={payment.date} placeholder="0" onChange={handleChange} />                                                
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="text" className='form-control' id='amount' value={payment.amount} placeholder="0" onChange={handleChange} /> 
                        </div>
                    </div>    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Interest Paid</label>
                            <input type="text" className='form-control' id='interestPaid' value={payment.interestPaid} placeholder="0" onChange={handleChange} /> 
                        </div>
                    </div>            
                </div>
                
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Fees Paid</label>
                            <input type="text" className='form-control' id='feesPaid' value={payment.feesPaid} placeholder="0" onChange={handleChange} /> 
                        </div>                        
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Principal Paid</label>
                            <input type="text" className='form-control' id='principalPaid' value={payment.principalPaid} placeholder="0" disabled /> 
                        </div>
                    </div>   
                    <div className="col-3">
                        <div className="form-group">
                            <label>Loan ID</label>
                            <select className="form-control" id="loanId" value={payment.loanId} onChange={handleChange}>
                                <option value="" hidden>Select loan...</option>
                                    {data.map(loan => {
                                        return <option value={loan._id} key={loan._id}>{loan._id}</option>
                                    })
                                    }
                            </select>
                        </div>
                    </div>                      
                </div>
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Borrower</label>
                            <input type="text" className='form-control' id='borrowerId' value={borrower} disabled />                                                                            
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Payment Channel</label>
                                <select className="form-control" value={payment.paymentChannel} id="paymentChannel" onChange={handleChange}>
                                    <option value="" hidden>Select...</option>
                                    <option value="BPI">BPI</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Checking">Checking</option>
                                    <option value="GCash">GCash</option>
                                    <option value="Paymaya">Paymaya</option>
                                </select>                                               
                        </div>
                    </div>   
                    <div className="col-3">
                        <div className="form-group">
                        <label>Status</label>
                                <select className="form-control" value={payment.status} id="status" onChange={handleChange}>
                                    <option value="" hidden>Select...</option>
                                    <option value="posted">Posted</option>
                                    <option value="received">Received</option>
                                </select>                                               
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
 
export default AddLoan;