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
    const [payment , setPayment] = useState(paymentData)
    const {data, loading} = useFetch('/borrowers')
    if(loading)return <h1>Loading...</h1>   
    
    async function handleSubmit(e){
        e.preventDefault();
        await axios.post(process.env.REACT_APP_API_URL + "/payments",payment)
        //clear state
        setPayment(paymentData)
    }

    function handleChange(e){       
        let principalPaid = 0
        switch (e.target.id) {
            case 'amount':
                if(isNaN(e.target.value))(
                    e.target.value = 0
                )
                principalPaid = parseInt(e.target.value) - parseInt(payment.interestPaid) - parseInt(payment.feesPaid)
                break;
            case 'interestPaid':
                if(isNaN(e.target.value))(
                    e.target.value = 0
                )
                principalPaid = parseInt(payment.amount) - parseInt(e.target.value) - parseInt(payment.feesPaid)
                break;
            case 'feesPaid':
                if(isNaN(e.target.value))(
                    e.target.value = 0
                )
                principalPaid = parseInt(payment.amount) - parseInt(payment.interestPaid) - parseInt(e.target.value)
                break;
            default:
                break;
        }
        if(isNaN(principalPaid)){
            principalPaid = 0
        }

        setPayment({...payment,[e.target.id]:e.target.value,principalPaid})
    }
    console.log(payment)
    return ( 
        <>   
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">
                    <h2>Payment</h2>
                </div>
                <div className="row mb-3">
                    <div className='col-1'></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" className='form-control' id='date' value={payment.date} onChange={handleChange} />                                                
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="text" className='form-control' id='amount' value={payment.amount} onChange={handleChange} /> 
                        </div>
                    </div>    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Interest Paid</label>
                            <input type="text" className='form-control' id='interestPaid' value={payment.interestPaid} onChange={handleChange} /> 
                        </div>
                    </div>            
                </div>
                
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Fees Paid</label>
                            <input type="text" className='form-control' id='feesPaid' value={payment.feesPaid} onChange={handleChange} /> 
                        </div>                        
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Principal Paid</label>
                            <input type="text" className='form-control' id='principalPaid' value={payment.principalPaid} readOnly /> 
                        </div>
                    </div>   
                    <div className="col-3">
                        <div className="form-group">
                        <label>Borrower</label>
                                <select className="form-control" id="borrowerId" value={payment.borrowerId} onChange={handleChange}>
                                    <option value="" hidden>Select borrower...</option>
                                    {data.map(borrower => {
                                        const fullName = borrower.name.firstName + " " + borrower.name.lastName
                                        return <option value={borrower._id} key={borrower._id}>{fullName}</option>
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
                            <label>Loan ID</label>
                            <select className="form-control" id="loanId" value={payment.loanId} onChange={handleChange}>
                                <option value="" hidden>Select loan...</option>
                                    {data.map(borrower => {
                                        const fullName = borrower.name.firstName + " " + borrower.name.lastName
                                        return <option value={borrower._id} key={borrower._id}>{fullName}</option>
                                    })
                                    }
                                </select>                                              
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